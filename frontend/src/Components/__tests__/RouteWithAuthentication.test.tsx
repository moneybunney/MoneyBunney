import { mount, shallow } from "enzyme";
import React from "react";
import { MemoryRouter, Redirect, Route } from "react-router-dom";

import RouteWithAuthentication from "../RouteWithAuthentication";

jest.mock("../../Utilities/AuthenticationCookies");
import { isAuthenticated } from "../../Utilities/AuthenticationCookies";

const StubComponent = () => <div> Foo </div>;

describe("<RouteWithAuthentication />", () => {
  it("Redirects to given route when authenticated but route is non-private", () => {
    isAuthenticated.mockImplementation(() => true);
    const component = () => (
      <RouteWithAuthentication
        Component={StubComponent}
        onlyLoggedIn={false}
        redirectRoute="bar"
      />
    );
    const wrapper = mount(
      <MemoryRouter initialEntries={["foo"]}>
        <Route path="foo" component={component} />
      </MemoryRouter>
    );

    expect(wrapper.find("StubComponent").length).toEqual(0);
    expect(wrapper.find("Router").prop("history").location.pathname).toEqual(
      "bar"
    );
  });

  it("Redirects to given route when not authenticated but route is private", () => {
    isAuthenticated.mockImplementation(() => false);
    const component = () => (
      <RouteWithAuthentication
        Component={StubComponent}
        onlyLoggedIn={true}
        redirectRoute="bar"
      />
    );
    const wrapper = mount(
      <MemoryRouter initialEntries={["foo"]}>
        <Route path="foo" component={component} />
      </MemoryRouter>
    );

    expect(wrapper.find("StubComponent").length).toEqual(0);
    expect(wrapper.find("Router").prop("history").location.pathname).toEqual(
      "bar"
    );
  });

  it("Renders given component when authenticated and route is private", () => {
    isAuthenticated.mockImplementation(() => true);
    const wrapper = mount(
      <MemoryRouter initialEntries={["foo"]}>
        <RouteWithAuthentication
          Component={StubComponent}
          onlyLoggedIn={true}
          redirectRoute="bar"
        />
      </MemoryRouter>
    );

    expect(wrapper.find("StubComponent").length).toEqual(1);
    expect(wrapper.find("Router").prop("history").location.pathname).toEqual(
      "foo"
    );
  });
});
