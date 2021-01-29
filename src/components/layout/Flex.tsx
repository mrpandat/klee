import AppBox, { AppBoxProps, PolymorphicComponent } from '../primitives/AppBox'
import useTheme from '../../hooks/useTheme'
import { FlexboxProps } from 'styled-system'
import React, { forwardRef } from 'react'

export interface FlexOptions {
  align?: FlexboxProps['alignItems']
  justify?: FlexboxProps['justifyContent']
  wrap?: FlexboxProps['flexWrap']
  direction?: FlexboxProps['flexDirection']
  basis?: FlexboxProps['flexBasis']
  grow?: FlexboxProps['flexGrow']
  shrink?: FlexboxProps['flexShrink']
  spacing?: number | string
}

export type FlexProps = Omit<
  AppBoxProps,
  'flexDirection' | 'alignItems' | 'justifyContent' | 'flexWrap' | 'flexBasis' | 'flexGrow' | 'spacing'
> &
  FlexOptions

const Flex = forwardRef<HTMLElement, FlexProps>((props, ref) => {
  const {
    direction = 'row',
    align,
    justify,
    wrap,
    basis,
    grow,
    spacing: userSpacing,
    display = 'flex',
    ...rest
  } = props
  const theme = useTheme()
  const spacing = typeof userSpacing === 'number' ? theme.space[userSpacing] : userSpacing
  const styles = {
    ...(spacing
      ? {
          '& > *': {
            ...(typeof direction === 'string' && direction === 'row' && { marginLeft: spacing }),
            ...(typeof direction === 'string' && direction === 'column' && { marginTop: spacing }),
            // While `gap` for flex is not supported by a mojority of browser,
            // we prefer this approach to have a broader compatibility, and also to support
            // responsive values 🔥🥵🔥
            ...(Array.isArray(direction) &&
              direction.reduce(
                (acc, _, index) => {
                  return {
                    ...acc,
                    [`@media screen and (min-width: ${theme.breakpoints[index]})`]:
                      direction[index + 1] === undefined
                        ? {}
                        : {
                            ...((direction[index + 1] ?? 'row') === 'row'
                              ? { marginLeft: spacing, marginTop: 0 }
                              : { marginTop: spacing, marginLeft: 0 }),
                          },
                  }
                },
                {
                  ...(direction[0] === 'row' && {
                    marginLeft: spacing,
                    marginTop: 0,
                  }),
                  ...(direction[0] === 'column' && {
                    marginTop: spacing,
                    marginLeft: 0,
                  }),
                },
              )),
            '&:first-child': {
              marginLeft: 0,
              marginTop: 0,
            },
          },
        }
      : {}),
  }

  return (
    <AppBox
      display={display}
      flexDirection={direction}
      alignItems={align}
      justifyContent={justify}
      flexWrap={wrap}
      flexBasis={basis}
      flexGrow={grow}
      ref={ref}
      css={styles}
      {...rest}
    />
  )
})

Flex.displayName = 'Flex'

export default Flex as PolymorphicComponent<FlexProps>
