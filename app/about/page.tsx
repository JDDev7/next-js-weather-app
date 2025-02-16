import React from "react";
import styles from "./about.module.css";
import Link from "next/link";
import { sulphurPoint } from "@/lib/utils";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "JDWeather | Sobre nosotros",
  description: "Sobre JDWeather",
};

const About = () => {
  return (
    <section className={`${styles.mainContainer} ${sulphurPoint.className}`}>
      <div className={styles.mainContent}>
        <div className={styles.mainTitle}>
          <h1>Sobre JDWeather</h1>
        </div>
        <div className={styles.avatarAndText}>
        <div>
            <Image src={"/avatar.webp"} alt="Avatar JDDev" width={300}height={300} className={styles.avatarImage}></Image>
        </div>
        <div className={styles.mainText}>
          <p>
            JDWeather nace como un pequeño proyecto de aprendizaje. Ha sido
            creada por José Diego &quot;JDDev&quot; Moreno. En ella, usando la
            API de OpenWeather, se puede obtener la información meteorológica de
            la ciudad de España en la que vives, con un diseño moderno y
            agradable. Si quieres trabajar con JDDev, puedes visitar su portafolio haciendo click 
          </p>
          <Link href="https://github.com/jddev7" className="font-bold text-gray-800 text-2xl">Aquí</Link>
        </div>
        </div>
      </div>
    </section>
  );
};

export default About;
