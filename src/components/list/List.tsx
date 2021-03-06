/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react'
import { FC, forwardRef } from 'react'
import Box, { BoxProps } from '../primitives/Box'
import ListItem from './ListItem'
import css from '@styled-system/css'

export interface ListProps extends BoxProps {
  readonly direction?: BoxProps['flexDirection']
}

type SubComponents = {
  Item: typeof ListItem
}

export const List = forwardRef<HTMLElement, ListProps>(
  ({ children, flexDirection, direction = 'column', ...props }, ref) => {
    return (
      <Box
        ref={ref}
        as="ul"
        css={css({
          listStyle: 'none',
          listStyleType: 'none',
        })}
        display="flex"
        flexDirection={direction ?? flexDirection}
        {...props}
      >
        {children}
      </Box>
    )
  },
)

List.displayName = 'List'
;(List as any).Item = ListItem

export default (List as unknown) as FC<ListProps> & SubComponents
