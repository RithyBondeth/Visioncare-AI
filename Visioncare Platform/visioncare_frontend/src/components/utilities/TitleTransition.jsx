import { TypeAnimation } from "react-type-animation"

export default function TitleTransition({ titles }) {
    return <TypeAnimation
        sequence={[titles[0], 1000, titles[1], 2000]}
        wrapper="span"
        cursor={true}
        repeat={Infinity}
        style={{ fontSize: '18', display: 'inline-block', color: "rgb(59 130 246)" }}
    />
}