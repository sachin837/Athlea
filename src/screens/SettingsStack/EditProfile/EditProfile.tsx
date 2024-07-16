import {FC} from "react";
import {View} from "react-native";
import {NavigationProp} from "@react-navigation/native";
import {BottomSheetScrollView} from "@gorhom/bottom-sheet";
import {ProfileImage, BackHeader} from "../../../components";
import {AvatarContainer} from "./EditProfile.style.tsx";

interface Props {
    navigation: NavigationProp<any>
}

export const EditProfile:FC<Props> = (props) => {
    return (
        <BottomSheetScrollView>
            <BackHeader title={"Edit profile"} />
            <AvatarContainer>
                <ProfileImage
                    edit
                    size={73}
                    letter={"M"}
                    backgroundColor={"#e1e1e1"}
                />
            </AvatarContainer>
            <View>
                {/*<CustomInput />*/}
            </View>
        </BottomSheetScrollView>
    )
}
