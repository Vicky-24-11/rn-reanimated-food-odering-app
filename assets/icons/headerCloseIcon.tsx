import { Path, Svg, SvgProps } from 'react-native-svg'
import colors from '@/constants/Colors'
import type { SVGIconProps } from '@/constants/types'

type Props = SVGIconProps & SvgProps
export default function HeaderCloseIcon({ fill = colors.black, ...props }: Props) {
  return (
    <Svg width={18} height={16} viewBox="0 0 18 16" {...props}>
      <Path
        d="M1 11L11 1M1 1L11 11"
        stroke="#0F1729"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
