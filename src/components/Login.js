import React from 'react';
import styled from 'styled-components';
import logo from "../img/login-logo.svg";
import hero from "../img/login-hero.svg";
import google from "../img/google.svg";
import { connect } from "react-redux";
import { signInAPI } from '../actions';
import { Redirect } from 'react-router-dom';

const Container = styled.div`
    padding: 0px;
`;
const Nav = styled.nav`
    max-width: 1128px;
    padding: 12px 0 16px 0;
    margin: auto;
    display: flex;
    align-items: center;
    position: relative;
    justify-content: space-between;
    flex-wrap: nowrap;

    a
    {
        width: 135px;
        height: 34px;

        @media (max-width: 768px)
        {
            padding: 0 5px;
        }
    }

`;

const Join = styled.a`
    font-size: 1rem;
    padding: 10px 12px;
    text-decoration: none;
    color: rgba(0, 0, 0, 0.6);
    margin-right: 12px;
    border-radius: 4px;

    &:hover
    {
        background: rgba(0, 0, 0, 0.08);
        color: rgba(0, 0, 0, 0.9);
        text-decoration: none;
    }
`;

const SignIn = styled.a`
    box-shadow: inset 0 0 0 1px #0a66c2;
    color: #0a66c2;
    border-radius: 24px;
    transition: 167ms;
    font-size: 1rem;
    font-weight: 600;
    line-height: 40px;
    padding: 10px 24px;
    text-align: center;
    background: rgba(0, 0, 0, 0,);

    &:hover
    {
        background: rgba(112, 181, 249, 0.15);
        color: #0a66c2;
        text-decoration: none;
    }
`;

const Section = styled.section`
    display: flex;
    align-content: start;
    min-height: 700px;
    padding-bottom: 138px;
    padding-top: 40px;
    padding: 60px 0;
    position: relative;
    flex-wrap: wrap;
    width: 100%;
    max-width: 1128px;
    align-items: center;
    margin: auto;

    @media(max-width: 768px)
    {
        margin: auto;
        min-height: 0px;
    }
`;

const Hero = styled.div`
    width: 100%;

    h1
    {
        padding-bottom: 0;
        width: 55%;
        font-size: 56px;
        color: #2977c9;
        font-weight: 200;
        line-height: 70px;

        @media(max-width: 768px)
        {
            text-align: center;
            font-size: 20px;
            width: 100%;
            line-height: 2;
        }
    }

    img
    {
        width: 700px;
        height: 670px;
        position: absolute;
        bottom: -2px;
        right: -150px;

        @media(max-width: 768px)
        {
            top: 230px;
            width: initial;
            position: initial;
            height: initial;
        }
    }
`;

const Form = styled.div`
    margin-top: 100px;
    width: 408px;

    @media(max-width: 768px)
    {
        margin-top: 20px;
    }
`;

const Google = styled.button`
    display: flex;
    justify-content: center;
    background: #fff;
    align-items: center;
    height: 56px;
    width: 100%;
    border-radius: 28px;
    box-shadow: inset 0 0 0 1px rgb(0 0 0 / 60%), inset 0 0 0 2px rgb(0 0 0 / 0%), inset 0 0 0 1px rgb(0 0 0 / 0%);
    vertical-align: middle;
    z-index: 0;
    transition: 167ms;
    font-size: 20px;
    color: rgba(0, 0, 0, 0.6);

    &:hover
    {
        background: rgba(207, 207, 207, 0.25);
        color: rgba(0, 0, 0, 0.75);
    }
`;

const mapStateToProps = (state) =>
{
    return {
        user: state.userState.user,
    };
};

const mapDispatchToProps = (dispatch) => ({
    signIn: () => dispatch(signInAPI()),
});

const Login = (props) => 
{
    return (
        <Container>
            {
                props.user && <Redirect to="/home" />
            }
            <Nav>
                <a href="/">
                    <img src={logo} alt="" />
                </a>
                <div>
                    <Join>Join Now</Join>
                    <SignIn>Sign In</SignIn>
                </div>
            </Nav>
            <Section>
                <Hero>
                    <h1>Welcome to your professional community!</h1>
                    <img src={hero} alt="" />
                </Hero>
                <Form>
                    <Google onClick={() => props.signIn()}>
                        <img src={google} alt="" />
                        Sign in with Google
                    </Google>
                </Form>
            </Section>
        </Container>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)