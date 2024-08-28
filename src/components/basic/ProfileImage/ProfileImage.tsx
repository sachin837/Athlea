import {Image, TouchableOpacity} from "react-native";
import {FC} from "react";
import type {ProfileImageProps} from "./type";
import {AvatarLetter, Container, EditContainer} from "./ProfileImage.style.tsx";
import Icon from "react-native-vector-icons/Ionicons";

export const ProfileImage:FC<ProfileImageProps> = (props) => {

    const fontSize = (props.size as number) * 0.45
    const editSize = (props.size as number) * 0.2

    return (
        <TouchableOpacity disabled={!props.edit} onPress={props.onPress}>
            <Container style={[props.style, {width: props.size, height: props.size, backgroundColor: props.backgroundColor}]}>
                {!!props.source && <Image source={props.source} style={{width: props.size, height: props.size}} />}
                {!props.source && (
                    <AvatarLetter style={{fontSize}}>{props.letter}</AvatarLetter>
                )}
                {props.edit && (
                    <EditContainer style={{backgroundColor: props.backgroundColor}}>
                        <Icon name={"create-outline"} style={{color: "black"}} size={editSize} />
                    </EditContainer>
                )}
            </Container>
        </TouchableOpacity>
    )
}

ProfileImage.defaultProps = {
    size: 48
}
