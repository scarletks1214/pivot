import * as React from 'react';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';

import Api from '../../api';

interface IState {
  isOpen: boolean;
}

export default class Header extends React.Component<any, IState> {
  state = {
    isOpen: false,
  };

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    let accountItem;
    let navbar;

    const user = Api.currentUser();
    if (user) {
      accountItem = (
        <NavItem>
          <NavLink href="/me">
            {user.firstName} {user.lastName}
          </NavLink>
        </NavItem>
      );

      navbar = (
        <Nav navbar={true}>
          <NavLink href="/exercises">Exercises</NavLink>
          <NavLink href="/exercise-tests">Exercise Tests</NavLink>
          <NavLink href="/class-sessions">Class Sessions</NavLink>
        </Nav>
      );
    } else {
      accountItem = (
        <NavItem>
          <NavLink href="/login">Login</NavLink>
        </NavItem>
      );
    }

    return (
      <header>
        <Navbar color="dark" dark={true} expand="md" fixed={'top'}>
          <NavbarBrand href="/">Trane</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            {navbar}
            <Nav className="ml-auto" navbar>
              {accountItem}
            </Nav>
          </Collapse>
        </Navbar>
      </header>
    );
  }
}
