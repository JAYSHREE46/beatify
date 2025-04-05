import React from 'react';
import '../assets/scss/Developer.scss';
import {IconButton} from "@material-ui/core";
import {Facebook, Instagram, LinkedIn, Portrait} from "@material-ui/icons";

const Developer = () => {
    return (
        <div className={"Developer"}>
            <h3 className={"Developer-head"}>Meet the developer</h3>
            <div className="Developer-profile">
                <div className="Developer-profileCard">
                    <div className={"Card-details"}>
                    
                        <h3>jayshree odedara</h3>
                        <p>software developer</p>
                    </div>
                </div>
                <div className="Developer-profileDetails">
                    <p>A Computer Science  Student at bhakt kavi narshin mehta University, junagadh.</p>
                    <p>Graduating in 2020 and looking for a responsible position to gain practical knowledge</p>
                    <p>A  web developer .</p>
                    <p>I love designing fully responsive websites.</p>
                    <p>I have a keen interest in developing projects, whenever I want to learn something new.</p>
                    <div className="Card-btn">
                        <IconButton target={"_blank"}  href={"https://www.facebook.com/jayshreeodedara"} title={"jayshreeodedara"}>
                            <Facebook/>
                        </IconButton>
                        <IconButton target={"_blank"} href={"https://www.linkedin.com/in/jayshreeodedara-/"}  title={"jayshreeodedara-"}>
                            <LinkedIn/>
                        </IconButton>
                        <IconButton target={"_blank"} href={"https://www.instagram.com/jayshreeodedara/"}  title={"odedara jayshree"}>
                            <Instagram/>
                        </IconButton>
                        <IconButton target={"_blank"} href={"https://jayshreeodedara.in/"}  title={"Web Portfolio"}>
                            <Portrait/>
                        </IconButton>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Developer;