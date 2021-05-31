import React from 'react'

const SVG = ({
  style = {},
  fill = 'none',
  width = '100%',
  className = 'fill-current h-6 w-6',
  viewBox = '0 0 204 204',
}) => (
  <svg
    width={width}
    style={style}
    height={width}
    viewBox={viewBox}
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <path
      d="M766.28113,288.85669a102,102,0,1,0,102,102A102,102,0,0,0,766.28113,288.85669Zm18.31561,101.16107c47.22559,47.96289,7.3667,44.05029-38.50189,44.05029-20.8775,0-31.31592,5.21973-31.31592,5.21973-15.11328,6.416-20.22467,5.4375-20.22467,5.4375-23.59613-.21881-13.26459-21.9649-13.26459-21.9649l31.31446-79.59369c3.47943-10.87311,21.74749-6.959,16.0932,7.39447-2.41211,5.76861-5.23047,12.90924-8.11811,20.41461l21.685-.02826c5.18366.10925,8.4458,4.6767,8.4458,7.722,0,2.82812-2.71826,8.64361-8.75928,8.64361l-27.52832-.07519c-6.84906,18.32519-8.69525,23.72558-8.69525,23.72558-7.58453,19.40869,5.46387,16.1474,24.61127,16.3291,35.01367.33051,63.96729-9.3789,31.4126-44.232C716.95276,335.0993,827.861,341.92548,827.861,341.92548s10.27728.86132,25.66358,2.54589C853.52454,344.47137,737.37366,342.05829,784.59674,390.01776Z"
      transform="translate(-664.28113 -288.85669)"
    />

    {/* <path
      d="M683.28113,282.85669a102,102,0,1,0,102,102A102,102,0,0,0,683.28113,282.85669Zm84.54407,56.59448c-11.24415,0-67.73438.95362-75.62012,19.78467-2.69434,6.43311.70605,14.53516,10.10449,24.08008,17.22949,17.49853,23.84473,29.01611,20.81738,36.24463-3.71191,8.86328-20.90527,9.585-41.311,9.585-2.93311,0-5.94873-.01856-9.02051-.03809-3.18311-.01953-6.42627-.03906-9.70068-.03906-20.34717,0-30.7666,5.06348-30.86963,5.11426-11.47217,4.873-17.30811,5.59668-19.77051,5.59668a7.3614,7.3614,0,0,1-.98145-.05469c-7.20214-.08008-12.11816-2.14258-14.61328-6.13086-4.3125-6.89355.32666-16.8418.52637-17.26172l31.28711-79.53174A9.97567,9.97567,0,0,1,646.189,334.001c1.37061,2.01318,2.55958,5.543.43848,10.92675-2.07324,4.959-4.62256,11.35547-7.59082,19.0459l20.22608-.02636c5.77587.12158,9.44726,5.24707,9.44726,8.72216,0,3.46094-3.26123,9.64356-9.75928,9.64356l-26.835-.07324c-6.564,17.57373-8.42431,22.99463-8.44238,23.04736-2.33545,5.97852-2.74463,9.918-1.26563,12.083,1.72071,2.52051,6.12745,3.02636,12.68018,3.02636,1.50147,0,3.09277-.02539,4.76025-.05175,1.8462-.0293,3.78516-.05957,5.79883-.05957.562,0,1.12744.00195,1.70069.00781q.84815.00879,1.6914.00781c23.39356,0,38.29688-4.65039,41.96387-13.09473,3.06152-7.04882-1.30664-16.96191-12.98291-29.46289-9.52734-10.20019-12.84473-18.85791-9.85889-25.73242,6.5835-15.15722,42.46289-17.42041,63.26465-17.42041,7.93164,0,13.44238.3335,13.49707.33692.125.01025,10.48828.8833,25.71,2.5498l-.1289,1.99414C770.49805,339.4707,769.53223,339.45117,767.8252,339.45117Z"
      transform="translate(-581.28113 -282.85669)"
    />     */}
  </svg>
)

export default SVG