import { Path, Svg, SvgProps } from 'react-native-svg'
import colors from '@/constants/Colors'
import type { SVGIconProps } from '@/constants/types'

type Props = SVGIconProps & SvgProps
export default function HeaderBackIcon2({ fill = colors.black, ...props }: Props) {
  return (
    <Svg width="9" height="14" viewBox="0 0 9 14" fill="none">
      <Path
        d="M7.5 13.25L1.25 7L7.5 0.75"
        stroke="#0F172A"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}