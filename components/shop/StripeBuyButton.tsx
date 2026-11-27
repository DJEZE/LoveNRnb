'use client'

import Script from 'next/script'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'stripe-buy-button': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        'buy-button-id': string
        'publishable-key': string
      }
    }
  }
}

interface Props {
  buyButtonId: string
}

const PUBLISHABLE_KEY = 'pk_live_51TwtfRDfa6xjnJVQutsNjsx1Ti7K7BpCgLtyjOjSLqeALzRj6vZ8WoAwbEwJ3w8fPzKnh610gJfX1Fkl8II6kP4L00Vj1HlQsw'

export function StripeBuyButton({ buyButtonId }: Props) {
  return (
    <>
      <Script
        src="https://js.stripe.com/v3/buy-button.js"
        strategy="afterInteractive"
      />
      <stripe-buy-button
        buy-button-id={buyButtonId}
        publishable-key={PUBLISHABLE_KEY}
      />
    </>
  )
}
