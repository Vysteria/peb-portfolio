import { Center, Container, Group, Paper, Space, Text, Title } from "@mantine/core";
import { Spacer } from "../Spacer";
import "./index.css";
import peb from './assets/peb.png';
import avatar from './assets/avatar.png'
import discord from './assets/discord.svg'
import github from './assets/github.svg'
import twitter from './assets/twitter.svg'
import gamedev from './assets/gamedev.svg'
import minecraft from './assets/minecraft.svg'
import scripting from './assets/scripting.svg'
import curves from './assets/curves.svg'
import { Carousel } from "@mantine/carousel";
import { useEffect, useRef, useState } from "react";
import { clamp } from "@mantine/hooks";

export function App() {
    const spheres = useRef<HTMLCanvasElement | null>(null)
    const sphereRender = useRef(false)
    const sphereCtx = useRef<CanvasRenderingContext2D | null>(null)
    const sphereField = useRef<any[]>([])

    function flattenWave(value: number) {
        return 0.5 + Math.sin(value) / 2;
    }

    function initSpheres() {
        const canvas = spheres.current!;
        const ctx = canvas.getContext('2d');

        sphereRender.current = true
        sphereCtx.current = ctx;

        generateSpheres();
        renderSpheres();
    }

    function generateSpheres() {
        const canvas = spheres.current!;
        const half = canvas.clientWidth / 2;


        sphereField.current = []

        for (let i = 0; i < 25; i++) {
        const x =  canvas.clientWidth * Math.random()
        const lin = x < half ? clamp(1 - (x / half), 0.3, 1)  : clamp(((x - half) / half), 0.3, 1)

            sphereField.current.push({
                x: x,
                y: (canvas.clientHeight - 200 * lin) * Math.random(),
                s: 15 + (Math.random() * 40),
                o: Math.random() * Math.PI,
                d: Math.random() * 10
            });
        }
    }

    function renderSphere(x: number, y: number, s: number, o: number, d: number) {
        const ctx = sphereCtx.current!;
        const offset = (y / spheres.current!.clientHeight);
        const opacity = flattenWave((Date.now() + d) * 0.0008 + o) * 0.4 * offset;

        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.arc(x, y, s, 0, 2 * Math.PI);
        ctx.fill();
    }

    function renderSpheres() {
        const width = spheres.current!.clientWidth;
        const height = spheres.current!.clientHeight;

        spheres.current!.width = width;
        spheres.current!.height = height;

        for (let i = 0; i < sphereField.current!.length; i++) {
            const { x, y, s, o, d } = sphereField.current![i];

            renderSphere(x, y, s, o, d);
        }

        if (sphereRender) {
            requestAnimationFrame(renderSpheres);
        }
    }

    useEffect(() => {
        window.addEventListener('resize', generateSpheres)

        return () => {
            window.removeEventListener('resize', generateSpheres)
        }
    }, [])

    useEffect(() => {
        initSpheres()

        return () => {
            sphereRender.current = false
        }
    }, [])

    return (
        <div className="app">
            <header>
                <img src={curves} alt="" className="curves" />
                <canvas
                    ref={spheres}
                    className="spheres"
                />
                <Container>
                    <Group>
                        <a href="https://google.com/">
                            <img
                                className="peb"
                                src={peb}
                                alt="peb"
                            />
                        </a>
                        <Spacer />
                        <a href="https://discord.gg/">
                            <img
                                className="svg"
                                src={discord}
                                alt="discord"
                            />
                        </a>
                        <a href="https://github.com/">
                            <img
                                className="svg"
                                src={github}
                                alt="github"
                            />
                        </a>
                        <a href="https://twitter.com/">
                            <img
                                className="svg"
                                src={twitter}
                                alt="twitter"
                            />
                        </a>
                    </Group>

                    <div>
                        <img className="avatar" src={avatar} alt="avatar" />
                    </div>

                    <Space h="md" />
                    <Title align="center" className="titleText">Hey, I'm Pebbers</Title>
                    <Text size="xl" align="center" className="titleText">I'm available for a variety of commissioned work</Text>
                    <Space h={70} />

                    <Group className="cards">
                        <Paper shadow="xl" radius="md" p="md" className="card">
                            <Center>
                                <img className="icon" src={scripting} alt="Modding" />
                            </Center>
                            <div className="cardText">
                                <Space h="xs" />
                                <Title align="center">Scripting</Title>
                                <Space h="xs" />
                                <Text size="md" align="center" color="gray">creating Bots & Web Scrapers</Text>
                            </div>
                        </Paper>
                        <Spacer />
                        <Paper shadow="xl" radius="md" p="md" className="card active">
                            <Center>
                                <img className="icon" src={minecraft} alt="Minecraft" />
                            </Center>
                            <div className="cardText">
                                <Space h="xs" />
                                <Title align="center">Minecraft</Title>
                                <Space h="xs" />
                                <Text size="md" align="center" color="gray">in Java, Kotlin & Typescript</Text>
                            </div>
                        </Paper>
                        <Spacer />
                        <Paper shadow="xl" radius="md" p="md" className="card">
                            <Center>
                                <img className="icon" src={gamedev} alt="Controller" />
                            </Center>
                            <div className="cardText">
                                <Space h="xs" />
                                <Title align="center">Game Dev</Title>
                                <Space h="xs" />
                                <Text size="md" align="center" color="gray">using Unreal Engine & Godot</Text>
                            </div>
                        </Paper>
                    </Group>
                </Container>
            </header>
            <section>
                <Container></Container>
            </section>
            <footer>
                <Container></Container>
            </footer>
        </div>
    );
}
