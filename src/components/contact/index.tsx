import React, { FC, useEffect, useState } from "react";
import { ContainerFullWidth, Container, AboutMeCard } from "./style";
import api from "../../services/api";
import { FaInstagram, FaTwitter, FaGithub, FaBuilding, FaHome, FaLinkedin, FaMailBulk } from "react-icons/fa"
import AOS from "aos";
import "aos/dist/aos.css";

interface IAboutMe {
    bio: string;
    avatar_url: string;
    followers: string;
    following: string;
    company: string;
    location: string;
}

interface IAboutCard {
    image: any;
    followers: string | undefined;
    following: string | undefined;
    company: string | undefined;
    location: string | undefined;
}

interface ISocialIcon {
    icon: any;
    url: string;
}

const socialData = [
    {
        icon: <FaGithub />,
        url: "https://github.com/MatheusPMelo"
    },
    {
        icon: <FaLinkedin />,
        url: "https://www.linkedin.com/in/matheus-prestes-de-melo/"
    },
    {
        icon: <FaTwitter />,
        url: "https://twitter.com/Matheus_744"
    },
    {
        icon: <FaInstagram />,
        url: "https://www.instagram.com/matheusprestesdemelo/?hl=pt-br"
    },
    {
        icon: <FaMailBulk />,
        url: "mailto:matheusprestesdemelo744@gmail.com"
    }

]



const SocialIcon: FC<ISocialIcon> = ({
    icon,
    url,
}) => (
    <div className="container-social-icon">
        <a href={url}>
            {icon}
        </a>
    </div>
)

const AboutMeCardData: FC<IAboutCard> = ({
    image,
    followers,
    following,
    company,
    location,
}) => (
    <AboutMeCard data-aos="fade-left" data-aos-anchor-placement={(window.innerWidth <= 768) ? "top-center" : "bottom"}>
        <div className="container-img">
            <img src={image} alt="minha foto de perfil do github" />
        </div>
        <div className="container-content-text">
            <span className="company"><FaBuilding /> I work at {company}</span>
            <span className="location"><FaHome /> I live in {location}</span>
            <div className="container-follows">
                <span className="followers">Followers: {followers}</span>
                <span className="following">Following: {following}</span>
            </div>
        </div>
    </AboutMeCard>
)

const Contact: React.FC = () => {

    const [aboutMe, setAboutMe] = useState<IAboutMe>()

    useEffect(() => {
        api.get('/users/matheuspmelo')
            .then(response => {
                setAboutMe(response.data)
            })

        AOS.init({
            duration: 800,
            delay: 200,
        });
    }, [])


    return (
        <ContainerFullWidth id="contact">
            <Container>
                <div className="container-me">
                    <AboutMeCardData
                        image={aboutMe?.avatar_url}
                        followers={aboutMe?.followers}
                        following={aboutMe?.following}
                        company={aboutMe?.company}
                        location={aboutMe?.location}
                    />
                </div>
                <div className="container-about-me" data-aos="fade-right" data-aos-anchor-placement={(window.innerWidth <= 768) ? "center" : "bottom"}>
                    <h1>About Me</h1>
                    <p>{aboutMe?.bio}</p>
                    <div className="container-social-media">
                        {socialData.map((item) => (
                            <SocialIcon
                                icon={item.icon}
                                url={item.url}
                            />
                        ))}
                    </div>
                </div>
            </Container>
        </ContainerFullWidth>
    )
}

export default Contact;