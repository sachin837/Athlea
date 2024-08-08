import {Message} from 'model/message';

export const parseMessage = (
  msg: string,
  msg_from: 'user' | 'gpt' | 'admin' | 'system',
): {message: Message; suggestion?: any} => {
  if (msg_from === 'user') {
    return {
      message: {type: 'answer', text: msg, goalOptions: [], serviceName: ''},
    };
  }

  try {
    const parsedMsg = JSON.parse(msg);
    console.log('Parsed message:', parsedMsg);

    if (parsedMsg.sender_name === 'System') {
      return {
        message: {
          type: 'system',
          text: parsedMsg.content,
          senderName: 'System',
          taskId: parsedMsg.task_id,
          serviceName: parsedMsg.service_name || '',
        },
      };
    }

    // Handle general chat type messages
    if (parsedMsg.chat_type === 'general') {
      return parseGeneralChatMessage(parsedMsg);
    }

    // Existing logic for other chat types
    return {message: parseOtherChatTypes(parsedMsg)};
  } catch (error) {
    console.error('Failed to parse message:', error);
    return {
      message: {
        type: 'question',
        text: msg,
        goalOptions: [],
        senderName: 'Unknown',
        serviceName: '',
      },
    };
  }
};

export const parseGeneralChatMessage = (
  parsedMsg: any,
): {message: Message; suggestion?: any} => {
  const senderName = parsedMsg.sender_name.replace(/_/g, ' ');
  const taskId = parsedMsg.task_id;
  const serviceName = parsedMsg.service_name || '';
  let content = parsedMsg.content;

  // If content is a string, try to parse it as JSON
  if (typeof content === 'string') {
    try {
      content = formatListItems(content);
    } catch (error) {
      console.error('Failed to parse content as JSON:', error);
    }
  }

  let message: Message;
  let suggestion: any = undefined;

  if (
    typeof content === 'object' &&
    content.suggestion &&
    content.suggestion.actions
  ) {
    message = {
      type: 'action',
      text: content.content || '',
      senderName,
      taskId,
      serviceName,
    };
    suggestion = {
      ...content.suggestion,
      senderName,
      serviceName,
    };
  } else if (typeof content === 'object' && content.message) {
    message = {
      type: 'action',
      text: content.message,
      senderName,
      taskId,
      workout: content.workout,
      serviceName,
    };
  } else if (content && (content.response || content.clarification)) {
    const combinedText = `${content.response || ''}\n${
      content.clarification || ''
    }`;
    message = {
      type: 'question',
      text: combinedText,
      senderName,
      taskId,
      serviceName,
    };
  } else if (content && content.content) {
    const text =
      typeof content.content === 'string'
        ? content.content
        : JSON.stringify(content.content);
    message = {
      type: 'question',
      text: text,
      senderName,
      taskId,
      serviceName,
    };
  } else if (typeof content === 'string') {
    message = {
      type: 'question',
      text: content,
      senderName,
      taskId,
      serviceName,
    };
  } else if (typeof content === 'object' && content.message) {
    message = {
      type: 'question',
      text: content.message,
      senderName,
      taskId,
      serviceName,
    };
  } else if (parsedMsg.message) {
    message = {
      type: 'question',
      text: parsedMsg.message,
      senderName,
      taskId,
      serviceName,
    };
  } else {
    console.error('Unexpected message format for general chat:', parsedMsg);
    message = {
      type: 'question',
      text: "Sorry, I couldn't process that message.",
      senderName,
      taskId,
      serviceName,
    };
  }

  return {message, suggestion};
};

export const formatListItems = (text: string): string => {
  // Regular expression to match numbered list items or bullet points
  const listItemRegex = /(\n\d+\.|\n-)\s*(.*?)(?=(\n\d+\.|\n-|$))/g;

  return text.replace(listItemRegex, (match, listMarker, listItem) => {
    return `\n${listMarker} ${listItem.trim()}\n`;
  });
};

export const parseOtherChatTypes = (parsedMsg: any): Message => {
  // Extract the content from the parsed message
  let content = parsedMsg.content || parsedMsg;

  // If content is a string, try to parse it as JSON
  if (typeof content === 'string') {
    try {
      content = JSON.parse(content);
    } catch (error) {
      console.error('Failed to parse content as JSON:', error);
    }
  }

  // Convert sender_name format from "Strength_Coach" to "Strength Coach"
  const senderName = (parsedMsg.sender_name || 'Unknown').replace(/_/g, ' ');
  const serviceName = parsedMsg.service_name || '';

  // Check if the content contains response and clarification
  if (content.response || content.clarification) {
    const combinedText = `${content.response || ''}\n${
      content.clarification || ''
    }`;
    return {
      type: 'question',
      text: combinedText,
      senderName,
      taskId: parsedMsg.task_id,
      serviceName,
    };
  }

  // If no response or clarification, check if it contains just content
  if (content.content) {
    const text =
      typeof content.content === 'string'
        ? content.content
        : JSON.stringify(content.content);
    return {
      type: 'question',
      text: text,
      senderName,
      taskId: parsedMsg.task_id,
      serviceName,
    };
  }

  // Check if the content contains segments or other specific fields
  if (content.session_type || content.duration || content.segments) {
    return {
      type: 'task',
      text: content,
      sessionType: content.session_type,
      senderName,
      taskId: parsedMsg.task_id,
      serviceName,
    };
  } else if (content.question) {
    return {
      type: 'question',
      text: content.question || '',
      goalOptions: content.goal_options || [],
      senderName,
      serviceName,
    };
  } else if (
    content.Monday ||
    content.Tuesday ||
    content.Wednesday ||
    content.Thursday ||
    content.Friday ||
    content.Saturday ||
    content.Sunday
  ) {
    return {
      type: 'event',
      text: content,
      senderName,
      serviceName,
    };
  } else {
    // Fallback to handling as a question type with generic text
    return {
      type: 'question',
      text: JSON.stringify(parsedMsg),
      goalOptions: [],
      senderName,
      serviceName,
    };
  }
};
