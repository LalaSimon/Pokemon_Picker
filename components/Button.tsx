import React, { useRef } from "react";
import {
    Animated,
    Text,
    TouchableWithoutFeedback,
    StyleSheet,
    View,
} from "react-native";

type AnimatedButtonProps = {
    title: string;
    cb: () => void;
    disabled: boolean;
};

export default function AnimatedButton({
    title,
    cb,
    disabled,
}: AnimatedButtonProps) {
    const position = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

    const handlePressIn = () => {
        if (disabled) return;
        Animated.timing(position, {
            toValue: { x: -6, y: -6 },
            duration: 150,
            useNativeDriver: false,
        }).start();
    };

    const handlePressOut = () => {
        if (disabled) return;
        Animated.timing(position, {
            toValue: { x: 0, y: 0 },
            duration: 150,
            useNativeDriver: false,
        }).start(() => {
            if (!disabled && cb) cb();
        });
    };

    return (
        <View style={styles.wrapper}>
            <View style={styles.background} />

            <TouchableWithoutFeedback
                disabled={disabled}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
            >
                <Animated.View
                    style={[
                        styles.button,
                        disabled && styles.buttonDisabled,
                        { transform: position.getTranslateTransform() },
                    ]}
                >
                    <Text style={styles.buttonText}>{title}</Text>
                </Animated.View>
            </TouchableWithoutFeedback>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        position: "relative",
    },
    background: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "#FFF",
        borderRadius: 8,
    },
    button: {
        backgroundColor: "#000",
        paddingVertical: 22,
        paddingHorizontal: 40,
        borderRadius: 8,
        shadowColor: "#FFF",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        zIndex: 1,
        borderStyle: "solid",
        borderWidth: 2,
        borderColor: "rgba(221, 221, 221, 1)",
    },
    buttonDisabled: {
        backgroundColor: "#DCDCDC",
        shadowOpacity: 0,
    },
    buttonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "600",
        textTransform: "uppercase",
    },
});
