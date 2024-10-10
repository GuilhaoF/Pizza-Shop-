import { MemoryRouter } from "react-router-dom"
import { NavLink } from "./nav-link"
import { render } from "@testing-library/react"

describe('nav-link', () => {
  it('should highlight when is the current page link', () => { 
    const activeRoutePath = '/about'

    const wrapper = render(
      <MemoryRouter initialEntries={[activeRoutePath]}> 
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
      </MemoryRouter>
    )
    wrapper.debug()

    expect(wrapper.getByText('Home').dataset.current).toBe('false')
    expect(wrapper.getByText('About').dataset.current).toBe('true')

  })
})