import Image from "next/image";
import React from "react";
import Javascript from "../public/assets/logo/js.png";
import Typescript from "../public/assets/logo/typescript.png";
import Node from "../public/assets/logo/nodejs.png";
import Express from "../public/assets/logo/expressjs.png";
import Reactjs from "../public/assets/logo/reactjs.png";
import Next from "../public/assets/logo/nextjs.png";
import MySQL from "../public/assets/logo/mysql.png";
import PostgreSQL from "../public/assets/logo/postgres.png";
import Mongo from "../public/assets/logo/mongo.png";
import Redis from "../public/assets/logo/redis.png";
import Linux from "../public/assets/logo/linux.png";
import Docker from "../public/assets/logo/docker.png";
import Redux from "../public/assets/logo/redux.png";
import Git from "../public/assets/logo/git.png";
import Github from "../public/assets/logo/github.png";
import Gitlab from "../public/assets/logo/gitlab.png";
import SocketIO from "../public/assets/logo/socketio.png";
import Tailwind from "../public/assets/logo/tailwindcss.png";

const Skills = () => {
  const dataSkills: any = [
    {
      logo: Javascript,
      title: "Javascript",
    },
    {
      logo: Typescript,
      title: "Typescript",
    },
    {
      logo: Node,
      title: "Node JS",
    },
    {
      logo: Express,
      title: "Express JS",
    },
    {
      logo: Reactjs,
      title: "React JS",
    },
    {
      logo: Next,
      title: "Next JS",
    },
    {
      logo: MySQL,
      title: "MySQL",
    },
    {
      logo: PostgreSQL,
      title: "PostgreSQL",
    },
    {
      logo: Mongo,
      title: "Mongo DB",
    },
    {
      logo: Redis,
      title: "Redis",
    },
    {
      logo: Linux,
      title: "Linux",
    },
    {
      logo: Docker,
      title: "Docker",
    },
    {
      logo: Redux,
      title: "Redux",
    },
    {
      logo: Git,
      title: "Git",
    },
    {
      logo: Github,
      title: "Github",
    },
    {
      logo: Gitlab,
      title: "Gitlab",
    },
    {
      logo: SocketIO,
      title: "Socket.IO",
    },
    {
      logo: Tailwind,
      title: "Tailwind CSS",
    },
  ];

  return (
    <div id="skills" className="w-full lg:min-h-screen p-2">
      <div className="max-w-[1240px] mx-auto flex flex-col justify-center h-full pt-20">
        <p className="text-xl tracking-widest uppercase text-[#5651e5]">
          Skills
        </p>
        <h2 className="py-4">What I Can Do</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {dataSkills &&
            dataSkills.map((item: any, index: number) => (
              <div
                key={index}
                className="p-6 shadow-xl rounded-xl hover:scale-105 ease-in duration-300"
              >
                <div className="grid grid-cols-2 gap-4 justify-center items-center">
                  <div className="m-auto">
                    <Image
                      src={item.logo}
                      alt={"/"}
                      width={64}
                      height={64}
                    />
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <h3>{item.title}</h3>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;
