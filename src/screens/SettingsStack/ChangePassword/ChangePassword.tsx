import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput, Text, Dropdown } from "../../../components";
import { FC } from "react";
import { View, TextInput as DefaultTextInput, KeyboardAvoidingView, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { useTheme } from 'styled-components/native'

interface Props {

}

export const ChangePassword: FC<Props> = (props) => {
  const theme = useTheme()
    const data = [
        { label: "Hi, how are you doing", value: "Bad things are about to happen" },
        { label: "Hi, how are you doing", value: "Bad things are about to happen" },
        { label: "Hi, how are you doing", value: "Bad things are about to happen" },
        { label: "Hi, how are you doing", value: "Bad things are about to happen" },
    ]

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.pageBackground }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps={"always"}>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Text themeColor={'subtitle'} type={"heading1"}>Hi there</Text>
                    <Text themeColor={'subtitle'} type={"heading2"}>Hi there</Text>
                    <Text themeColor={'subtitle'} type={"heading3"}>Hi there</Text>
                    <Text themeColor={'subtitle'} type={"subheading"}>Hi there</Text>
                    <Text themeColor={'subtitle'} type={"body"}>Hi there</Text>
                    <Text themeColor={'subtitle'} type={"subBody"}>Hi there</Text>
                    <Text themeColor={'subtitle'} type={"small"}>Hi there</Text>
                    <Text themeColor={'subtitle'} type={"tiny"}>Hi there</Text>
                    <View style={{ padding: 16, width: "100%" }}>
                        {/* <Dropdown
                            data={data}
                            labelField={"label"}
                            valueField={"value"}
                            onChange={() => {}}
                            inputProps={{customComponent: BottomSheetTextInput}}
                        />
                        <TextInput
                            label={"Hi there"}
                            customComponent={BottomSheetTextInput}
                            optionalLabel={"Not working"}
                            // errorText={"Something went wrong"}
                        /> */}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
