import * as React from "react"
import { Link } from "gatsby"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location ? location.pathname === rootPath : false

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <main>{children}</main>
    </div>
  )
}

export default Layout
