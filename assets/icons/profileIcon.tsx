import { Path, Svg, SvgProps } from 'react-native-svg'
import colors from '@/constants/Colors'
import type { SVGIconProps } from '@/constants/types'

type Props = SVGIconProps & SvgProps
export default function ProfileIcon({ fill = colors.matterhorn, ...props }: Props) {
  return (
    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...props}>
      <Path
        d="M2.14074 15.8558H13.8589C14.325 15.8558 14.6905 15.7524 14.9556 15.5456C15.2206 15.3387 15.3531 15.0547 15.3531 14.6935C15.3531 14.1343 15.1828 13.543 14.842 12.9197C14.5012 12.2963 14.0118 11.7123 13.3739 11.1676C12.736 10.6229 11.9641 10.1802 11.0582 9.83937C10.1524 9.49856 9.13145 9.32816 7.99546 9.32816C6.86529 9.32816 5.84727 9.49856 4.94139 9.83937C4.03552 10.1802 3.26217 10.6229 2.62136 11.1676C1.98054 11.7123 1.49119 12.2963 1.15331 12.9197C0.815426 13.543 0.646484 14.1343 0.646484 14.6935C0.646484 15.0547 0.779016 15.3387 1.04408 15.5456C1.30914 15.7524 1.6747 15.8558 2.14074 15.8558ZM8.0042 7.76403C8.62754 7.76403 9.20425 7.59363 9.73435 7.25283C10.2645 6.91203 10.6912 6.45036 11.0146 5.8678C11.3379 5.28524 11.4995 4.62986 11.4995 3.90166C11.4995 3.18512 11.3379 2.54285 11.0146 1.97485C10.6912 1.40686 10.2645 0.959749 9.73435 0.633514C9.20425 0.307281 8.62754 0.144165 8.0042 0.144165C7.38086 0.144165 6.80412 0.310194 6.274 0.642252C5.74387 0.974312 5.31715 1.4258 4.99383 1.9967C4.67051 2.56761 4.50885 3.20842 4.50885 3.91915C4.50885 4.64151 4.67051 5.29252 4.99383 5.87217C5.31715 6.45181 5.74387 6.91203 6.274 7.25283C6.80412 7.59363 7.38086 7.76403 8.0042 7.76403Z"
        fill={fill}
      />
    </Svg>
  )
}
