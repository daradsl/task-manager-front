import { extendTheme } from "@chakra-ui/react";

const customTheme = extendTheme({
    colors: {
        teal: {
            500: "#008080",
        },
    },
    fonts: {
        heading: "Arial, sans-serif",
    },
    styles: {
        global: {
            "html, body": {
                bg: "gray.100",
            },
        },
    },
});


export default customTheme;