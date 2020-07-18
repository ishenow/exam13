import React, { Fragment } from 'react';
import { DropdownItem, DropdownMenu, DropdownToggle, NavLink, UncontrolledDropdown } from 'reactstrap';
import { NavLink as RouterNavLink } from 'react-router-dom';

const UserMenu = ({ user, logout }) => (
  <Fragment>
    <UncontrolledDropdown nav inNavbar>
      <DropdownToggle nav caret>
        Hello, {user.displayName}
      </DropdownToggle>
      <DropdownMenu right>
        <DropdownItem onClick={logout}>
          Log out
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
    {user &&
    <NavLink tag={RouterNavLink} to="/places/add">Add new place</NavLink>
    }
  </Fragment>
);

export default UserMenu;
