import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import user from "../img/user.svg";
import photo from "../img/photo-icon.svg";
import video from "../img/video-icon.svg";
import event from "../img/event-icon.svg";
import article from "../img/article-icon.svg";
import ellipsis from "../img/ellipsis-icon.svg";
import shared from "../img/shared-image-icon.jpg";
import likes from "../img/likes-icon.svg";
import reaction from "../img/reaction-icon.svg";
import comment from "../img/comment-icon.svg";
import share from "../img/share-icon.svg";
import send from "../img/send-icon.svg";
import PostModal from "./PostModal";
import loader from "../img/spinning-loading.gif";
import { connect } from 'react-redux';
import { getArticlesAPI } from '../actions';
import ReactPlayer from 'react-player';

const Main = (props) => 
{
    const [showModal, setShowModal] = useState("close");

    useEffect(() =>
    {
        props.getArticles();
    }, []);

    const handleClick = (e) =>
    {
        e.preventDefault();

        if(e.target !== e.currentTarget)
        {
            return;
        }

        switch(showModal)
        {
            case "open":
                setShowModal("close");
                break;
            case "close":
                setShowModal("open");
                break;
            default: 
                setShowModal("close");
                break;
        }
    };

    return (
        <>
            {
                props.articles.length === 0 ? <p>There are no articles</p> :
                <Container>
                    <ShareBox>
                        <div>
                            { props.user && props.user.photoURL ? 
                                <img src={props.user.photoURL} alt="" />
                                : <img src={user} alt="" />
                            }
                            <button 
                                onClick={handleClick} 
                                disabled={props.loading ? true : false}
                            >Start a post</button>
                        </div>

                        <div>
                            <button>
                                <img src={photo} alt="" className="photo" />
                                <span>Photo</span>
                            </button>

                            <button>
                                <img src={video} alt="" className="photo" />
                                <span>Video</span>
                            </button>

                            <button>
                                <img src={event} alt="" className="photo" />
                                <span>Event</span>
                            </button>

                            <button>
                                <img src={article} alt="" className="photo" />
                                <span>Write article</span>
                            </button>
                        </div>
                    </ShareBox>
                    <Content>
                        {props.loading && <img src={loader} className="spin" alt="" />}
                        {props.articles.length > 0 && props.articles.map((article, key) => (
                        <Article key={key}>
                            <SharedActor>
                                <a>
                                    <img src={article.actor.image} alt="" />
                                    <div>
                                        <span>{article.actor.title}</span>
                                        <span>{article.actor.description}</span>
                                        <span>{article.actor.date.toDate().toLocaleDateString()}</span>
                                    </div>
                                </a>
                                <button>
                                    <img src={ellipsis} alt="" className="photo" />
                                </button>
                            </SharedActor>
                            <Description>
                                {article.description}
                            </Description>
                            <SharedImg>
                                <a>
                                    {
                                        !article.sharedImg && article.video ? <ReactPlayer width={"100%"} height={"475px"} url={article.video} /> 
                                        :
                                        (
                                            article.sharedImg && <img src={article.sharedImg} alt="" />
                                        )
                                    }
                                </a>
                            </SharedImg>
                            <SocialCounts>
                                <li>
                                    <button>
                                        <img src={likes} alt="" />
                                        <img src={reaction} alt="" />
                                        <span>75</span>
                                    </button>
                                </li>
                                <li>
                                    <a>{article.comments}</a>
                                </li>
                            </SocialCounts>
                            <SocialActions>
                                <button className="likes">
                                    <img src={likes} alt="" />
                                    <span>Like</span>
                                </button>
                                <button className="likes">
                                    <img src={comment} alt="" />
                                    <span>Comment</span>
                                </button>
                                <button className="likes">
                                    <img src={share} alt="" />
                                    <span>Share</span>
                                </button>
                                <button className="likes">
                                    <img src={send} alt="" />
                                    <span>Send</span>
                                </button>
                            </SocialActions>
                        </Article>
                        ))}
                    </Content>
                    <PostModal showModal={showModal} handleClick={handleClick} />
                </Container>
            }
        </>
    );
};

const Container = styled.div`
    grid-area: main;

    img.photo
    {
        width: 38px;
        height: 38px;
        padding: 5px 0;
    }
`;

const CommonCard = styled.div`
    text-align: center;
    overflow: hidden;
    margin-bottom: 8px;
    background: #fff;
    border-radius: 5px;
    position: relative;
    border: none;
    box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
`;

const ShareBox = styled(CommonCard)`
    display: flex;
    flex-direction: column;
    color: #958b7b;
    margin: 0 0 8px;
    background: white;

    div
    {
        button
        {
            outline: none;
            color: rgba(0, 0, 0, 0.6);
            font-size: 14px;
            line-height: 1.5;
            min-height: 48px;
            background: transparent;
            border: none;
            display: flex;
            align-items: center;
            font-weight: 600;
        }

        &:first-child
        {
            display: flex;
            align-items: center;
            padding: 8px 16px 0px 16px;

            img
            {
                width: 48px;
                border-radius: 50%;
                margin-right: 8px;
            }

            button
            {
                margin: 4px 0;
                flex-grow: 1;
                border-radius: 35px;
                padding-left: 16px;
                border: 1px solid rgba(0, 0, 0, 0.15);
                background: white;
                text-align: left;
            }
        }

        &:nth-child(2)
        {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            padding-bottom: 4px;

            button
            {
                img
                {
                    margin: 0 4px 0 -2px;
                }

                span
                {
                    color: #70b5f9;
                }
            }
        }
    }
`;

const Article = styled(CommonCard)`
    padding: 0;
    margin: 0 0 8px;
    overflow: visible;

    button.likes
    {
        font-size: 20px;
        padding: 5px 10px;

        img
        {
            width: 30px;
        }
    }
`;

const SharedActor = styled.div`
    display: flex;
    flex-wrap: nowrap;
    padding: 12px 16px 0;
    margin-bottom: 8px;
    align-items: center;

    a
    {
        display: flex;
        margin-right: 12px;
        flex-grow: 1;
        overflow: hidden;
        text-decoration: none;

        img
        {
            width: 48px;
            height: 48px;
        }

        div
        {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            flex-basis: 0;
            margin-left: 8px;
            overflow: hidden;

            span
            {
                text-align: left;

                &:first-child
                {
                    font-size: 14px;
                    font-weight: 700;
                    color: rgba(0, 0, 0, 1);
                }

                &:nth-child(n + 1)
                {
                    font-size: 12px;
                    color: rgba(0, 0, 0, 0.6);
                }
            }
        }
    }

    button
    {
        position: absolute;
        right: 12px;
        top: 0;
        background: transparent;
        border: none;
        outline: none;
    }
`;

const Description = styled.div`
    padding: 0 16px;
    overflow: hidden;
    color: rgba(0, 0, 0, 0.9);
    font-size: 14px;
    text-align: left;
`;

const SharedImg = styled.div`
    margin-top: 8px;
    width: 100%;
    display: block;
    position: relative;
    background: #f9fafb;

    img
    {
        object-fit: contain;
        width: 100%;
        height: 100%;
    }
`;

const SocialCounts = styled.ul`
    line-height: 1.3;
    display: flex;
    align-items: flex-start;
    overflow: auto;
    margin: 0 16px;
    padding: 8px 0;
    border-bottom: 1px solid #e9e5df;

    li
    {
        list-style: none;
        margin-right: 5px;
        font-size: 12px;
        
        button
        {
            display: flex;
            margin-right: 5px;
            align-items: center;
            width: 100%;
            padding: 5px 2px;
            justify-content: space-around;
            border: none;
            background #fff;

            img
            {
                width: 20px;
            }
        }
    }
`;

const SocialActions = styled.div`
    align-items: center;
    display: flex;
    justify-content: flex-start;
    margin: 0;
    padding: 4px 8px;

    button
    {
        display: inline-flex;
        align-items: center;
        padding: 8px;
        color: #0a66c2;
        border: none;
        background: #fff;

        @media(min-width: 768px)
        {
            span
            {
                margin-left: 8px;
            }
        }
    }
`;

const Content = styled.div`
    text-align: center;

    img.spin
    {
        width: 30px;
    }
`;

const mapStateToProps = (state) =>
{
    return {
        loading: state.articleState.loading,
        user: state.userState.user,
        articles: state.articleState.articles,
    };
};

const mapDispatchToProps = (dispatch) => ({
    getArticles: () => dispatch(getArticlesAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main)
