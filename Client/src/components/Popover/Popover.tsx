import { useRef, useState, useId, ElementType } from 'react'
import { FloatingPortal, useFloating, FloatingArrow, arrow, type Placement } from '@floating-ui/react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  children?: React.ReactNode
  renderPopover: React.ReactNode
  className?: string
  as?: ElementType
  initialOpen?: boolean
  placement?: Placement
}

const Popover = ({ children, className, renderPopover, as: Element = 'div', initialOpen, placement }: Props) => {
  const [open, setOpen] = useState<boolean>(initialOpen || false)
  const ref = useRef(null)
  const { refs, context, strategy, x, y } = useFloating({
    middleware: [
      arrow({
        element: ref
      })
    ],
    placement: placement
  })
  const id = useId()
  return (
    <Element
      className={className}
      ref={refs.setReference}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {children}
      {open && (
        <FloatingPortal id={id}>
          <AnimatePresence>
            <motion.div
              className='bg-white relative shadow-sm rounded-sm border border-gray-200 py-3'
              ref={refs.setFloating}
              style={{
                position: strategy,
                top: y ?? 0,
                left: x ?? 0
              }}
              initial={{ opacity: 0, transform: 'scale(0)' }}
              animate={{ opacity: 1, transform: 'scale(1)' }}
              exit={{ opacity: 0, transform: 'scale(0)' }}
              transition={{ duration: 0.2 }}
            >
              {/* <p className='py-2 px-3 hover:text-orange-500'>Tiếng Việt</p>
              <p className='py-2 px-3 hover:text-orange-500'>English</p> */}
              {renderPopover}
              <FloatingArrow ref={ref} context={context} fill='white' width={20} height={10}></FloatingArrow>
            </motion.div>
          </AnimatePresence>
        </FloatingPortal>
      )}
    </Element>
  )
}

export default Popover
