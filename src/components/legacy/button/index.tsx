import React, { FunctionComponent } from "react";
import useDeviceOrientation from "../../../hooks/useDeviceOrientation.tsx";
import { StrictButtonProps } from "./button";
import {
  StyledButton,
  StyledText as Text,
  StyledButtonIcon,
} from "./button.style.tsx";

const ButtonComp: FunctionComponent<StrictButtonProps> = ({
  type = "primary",
  text = "text",
  endAdornment = false,
  disabled,
  onPress,
  testID,
  removeBottomSpace = false,
  customWidthSize,
  style,
  // customAspectRatio,
}) => {
  const { calculateAspectRatio } = useDeviceOrientation();
  const OnApply = disabled === true ? () => null : onPress;
  const socialMediaIcon = {
    primary: "",
    secondary: "",
    third: "",
    refresh: "refresh",
    facebook: "facebook",
    google: "google",
    apple: "apple",
    edit: "edit",
    bluetooth: "bluetooth",
  }[type];
  return (
    <StyledButton
      // type={type}
      style={style}
      // disabledButton={disabled}
      // activeOpacity={disabled ? 1 : 0.8}
      onPress={OnApply}
      // removeBottomSpace={removeBottomSpace}
      // customWidthSize={customWidthSize}
      // aspectRatio={
      //   customAspectRatio
      //     ? calculateAspectRatio(
      //         customAspectRatio.widthRatio,
      //         customAspectRatio.heightRatio,
      //       )
      //     : calculateAspectRatio(1, 0.12)
      // }
      testID={testID}
    >
      <StyledButtonIcon>
        <Text
          buttonType={type}
          disabledButton={disabled}
          type={"subtitle2"}
          fontWeight={"bold"}
          letterSpacing={2}
          removeBottomSpace
        >
          {text.toLocaleUpperCase()}
        </Text>
      </StyledButtonIcon>
    </StyledButton>
  );
};

export default ButtonComp;
