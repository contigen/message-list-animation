import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const plusIcon = (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='currentColor'
    className='w-4 h-4'
  >
    <path
      fillRule='evenodd'
      d='M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z'
      clipRule='evenodd'
    />
  </svg>
)

const seeds = [
  { user: 'me', text: 'Yo yo' },
  { user: 'them', text: "Hey! What's up?" },
  { user: 'me', text: 'Nm dude. Wrapping up work soon' },
  { user: 'them', text: 'Nice' },
  { user: 'me', text: 'Want to lift tonight?' },
  { user: 'them', text: 'Yep just about finishing up work' },
  { user: 'them', text: 'Can you give me like 10' },
  { user: 'me', text: 'Perf' },
  { user: 'me', text: 'We hitting shoulders today?' },
  { user: 'them', text: 'Yep' },
  { user: 'me', text: 'Awesome!' },
  { user: 'me', text: 'See you soon 💪' },
]

const seedWithId = seeds.map((seed, i) => ({ ...seed, id: i + 1 }))

export function MessageList() {
  const [messages, setMessages] = useState(seedWithId)
  const [lastRemovedIdx, setLastRemovedIdx] = useState<null | number>(null)

  function addMessage() {
    setLastRemovedIdx(null)
    const index = Math.floor(Math.random() * messages.length)
    const newMessage = {
      id: (messages.length || 0) + 1,
      user: Math.random() > 0.5 ? 'me' : 'them',
      text: "Your mom said it's time to come home",
    }
    setMessages([
      ...messages.slice(0, index),
      newMessage,
      ...messages.slice(index),
    ])
  }

  function removeMessage(message: (typeof seedWithId)[number]) {
    setLastRemovedIdx(messages.indexOf(message))
    setMessages(messages => messages.filter(m => m.id !== message.id))
  }
  const afterToBeRemovedMessage = messages.slice(lastRemovedIdx ?? 0)
  return (
    <div>
      <h2>Message List!</h2>
      <div className='flex flex-col max-w-sm px-4 mx-auto'>
        <div className='mt-4 text-right'>
          <button
            onClick={addMessage}
            className='hover:bg-gray-100 active:bg-gray-200 rounded-full inline-flex items-center justify-center p-1.5 text-gray-500 hover:text-gray-700'
          >
            {plusIcon}
          </button>
        </div>
        <ul className='w-full mt-4 text-sm'>
          <AnimatePresence>
            {messages.map(message => (
              <motion.li
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                key={message.id}
                transition={{
                  opacity: { duration: 0.2 },
                  layout: {
                    type: `spring`,
                    bounce: 0.4,
                    duration: lastRemovedIdx
                      ? afterToBeRemovedMessage.indexOf(message) * 0.15 + 0.85
                      : 1,
                  },
                }}
                style={{
                  originX: message.user === `me` ? 1 : 0,
                }}
              >
                <span className='py-.5 flex'>
                  <button
                    onClick={() => removeMessage(message)}
                    className={`${
                      message.user === 'me'
                        ? 'bg-blue-500 ml-auto me'
                        : 'bg-gray-500 mr-auto them'
                    } px-3 py-1 text-white text-left quote`}
                  >
                    {message.text}
                  </button>
                </span>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </div>
  )
}
