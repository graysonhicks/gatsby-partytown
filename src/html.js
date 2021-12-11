import React from "react"
import PropTypes from "prop-types"
import {
  Partytown,
  GoogleTagManager,
  GoogleTagManagerNoScript,
} from "@builder.io/partytown/react"

console.log(process.env.GATSBY_GTM_ID)
export default function HTML(props) {
  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        {props.headComponents}
        <GoogleTagManager containerId={process.env.GATSBY_GTM_ID} />
        <Partytown />
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <GoogleTagManagerNoScript containerId={process.env.GATSBY_GTM_ID} />
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
      </body>
    </html>
  )
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}
