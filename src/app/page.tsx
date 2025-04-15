"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowUpRight, Award, BookOpen, ChevronRight, Clock, Mail, MapPin, Phone, Send, Sparkles } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const FadeInSection = ({ children, delay = 0, className = "" }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay: delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const FloatingElement = ({ children, className = "" }) => {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -15, 0],
      }}
      transition={{
        duration: 4,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  )
}

const RotatingElement = ({ children, className = "" }) => {
  return (
    <motion.div
      className={className}
      animate={{
        rotate: [0, 10, 0, -10, 0],
      }}
      transition={{
        duration: 8,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  )
}

const GlowingButton = ({ children, className = "", ...props }) => {
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} className={`relative ${className}`}>
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 opacity-70 blur-xl"
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <Button
        size="lg"
        className="relative z-10 bg-gradient-to-r from-pink-500 to-purple-500 text-white border-0 hover:text-white hover:from-pink-600 hover:to-purple-600"
        {...props}
      >
        {children}
      </Button>
    </motion.div>
  )
}

const ParticleBackground = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    let animationFrameId

    // Set canvas dimensions
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    // Create particles
    const particlesArray = []
    const numberOfParticles = 100

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 5 + 1
        this.speedX = Math.random() * 1 - 0.5
        this.speedY = Math.random() * 1 - 0.5
        this.color = `rgba(${Math.floor(Math.random() * 100) + 200}, ${Math.floor(Math.random() * 100) + 100}, ${Math.floor(Math.random() * 255)}, ${Math.random() * 0.3 + 0.1})`
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > canvas.width) this.x = 0
        else if (this.x < 0) this.x = canvas.width

        if (this.y > canvas.height) this.y = 0
        else if (this.y < 0) this.y = canvas.height
      }

      draw() {
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const init = () => {
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle())
      }
    }

    init()

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update()
        particlesArray[i].draw()
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />
}

const NavItem = ({ href, children }) => {
  return (
    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
      <Link href={href} className="px-4 py-2 text-gray-700 hover:text-pink-500 transition-colors">
        {children}
      </Link>
    </motion.div>
  )
}

export default function Portfolio() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const certifications = [
    {
      title: "Mobile Marketing Strategy",
      issuer: "LinkedIn",
      date: "Jul 2024",
      skills: ["Marketing Strategy", "Mobile Marketing"],
      icon: "/images/linkedin.svg",
      showCredential: true,
      color: "bg-blue-50"
    },
    {
      title: "Google Analytics",
      issuer: "Google",
      date: "Jun 2024",
      icon: "/images/google.svg",
      color: "bg-gray-50"
    },
    {
      title: "Hootsuite Platform Certification",
      issuer: "Hootsuite",
      date: "Nov 2023",
      credentialId: "87388457",
      icon: "/images/hootsuite.svg",
      showCredential: true,
      color: "bg-red-50"
    },
    {
      title: "Microsoft PowerPoint 2013",
      issuer: "Microsoft",
      date: "Apr 2020",
      icon: "/images/microsoft.svg",
      color: "bg-orange-50"
    },
    {
      title: "Microsoft Word 2013 Certification",
      issuer: "Microsoft",
      date: "Apr 2020",
      icon: "/images/microsoft.svg",
      color: "bg-green-50"
    }
  ]

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <ParticleBackground />

      {/* Cursor follower */}
      <motion.div
        className="fixed w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 mix-blend-multiply opacity-30 pointer-events-none z-50 hidden md:block"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: [1, 1.2, 1],
        }}
        transition={{
          x: { duration: 0.2, ease: "easeOut" },
          y: { duration: 0.2, ease: "easeOut" },
          scale: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
        }}
      />

      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full py-6">
        <div className="container max-w-6xl mx-auto">
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center"
          >
            <nav className="flex gap-8 px-8 py-3 bg-white/80 backdrop-blur-md rounded-full shadow-lg">
              <NavItem href="#home">
                <span className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4"
                  >
                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                  Home
                </span>
              </NavItem>
              <NavItem href="#about">
                <span className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4" />
                    <path d="M12 8h.01" />
                  </svg>
                  About
                </span>
              </NavItem>
              <NavItem href="#work">
                <span className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4"
                  >
                    <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                  </svg>
                  Work
                </span>
              </NavItem>
              <NavItem href="#contact">
                <span className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  Contact
                </span>
              </NavItem>
            </nav>
          </motion.div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center py-32">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="flex flex-col items-center text-center space-y-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <h1 className="text-8xl md:text-9xl font-black tracking-tight">Sara Beer</h1>
              <motion.div
                className="absolute -top-8 -right-8 text-pink-500"
                animate={{
                  rotate: [0, 20, 0, -20, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <Sparkles className="w-12 h-12" />
              </motion.div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="text-xl text-gray-600 max-w-2xl"
            >
              Combined Degree Public Relations Student at the University of Florida
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row gap-6"
            >
              <GlowingButton>Get In Touch</GlowingButton>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link href="/sararesume.pdf" target="_blank">
                  <Button variant="outline" size="lg" className="border-2 border-gray-300">
                    View Resume
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-8 h-8 text-gray-400"
          >
            <path d="M12 5v14" />
            <path d="m19 12-7 7-7-7" />
          </svg>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 bg-gradient-to-b from-white to-pink-50">
        <div className="container max-w-6xl mx-auto px-4">
          <FadeInSection className="mb-16 text-center">
            <h2 className="text-5xl font-bold mb-6">About Me</h2>
            <div className="w-24 h-2 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto rounded-full"></div>
          </FadeInSection>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <FadeInSection delay={0.2}>
              <div className="relative">
                <RotatingElement className="relative z-10">
                  <div className="rounded-3xl overflow-hidden border-8 border-white shadow-xl">
                    <Image
                      src="/headshot.png"
                      alt="Sara Beer"
                      width={600}
                      height={600}
                      className="w-full h-auto"
                    />
                  </div>
                </RotatingElement>

                <motion.div
                  className="absolute -bottom-8 -right-8 bg-white p-4 rounded-2xl shadow-lg z-20"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-full p-3">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-bold">UF Combined Degree</p>
                      <p className="text-sm text-gray-500">PR Excellence</p>
                    </div>
                  </div>
                </motion.div>

                <div className="absolute -z-10 w-full h-full bg-gradient-to-r from-pink-300 to-purple-300 rounded-3xl -bottom-6 -right-6"></div>
              </div>
            </FadeInSection>

            <FadeInSection delay={0.4} className="space-y-8">
              <div className="inline-block rounded-full bg-pink-100 px-4 py-1 text-pink-600 font-medium">
                Driven by strategy, focused on impact
              </div>

              <p className="text-xl leading-relaxed">
                Hi, I'm Sara. As a passionate Public Relations student at UF, I thrive on crafting compelling narratives
                and building meaningful connections. My focus is on leveraging strategic communication to drive
                measurable results and elevate brand presence.
              </p>

              <p className="text-lg text-gray-600 leading-relaxed">
                From digital campaigns to brand identity development, I bring a blend of creativity and analytical
                thinking to every project. I believe in the power of authentic storytelling and data-driven strategies
                to create impactful PR campaigns.
              </p>

              <div className="pt-4">
                <motion.div className="inline-block" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-pink-500 to-purple-500 text-white border-0 hover:text-white"
                  >
                    Learn More
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Work Experience */}
      <section id="work" className="py-32">
        <div className="container max-w-6xl mx-auto px-4">
          <FadeInSection className="mb-16 text-center">
            <h2 className="text-5xl font-bold mb-6">My Work</h2>
            <div className="w-24 h-2 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A showcase of my strategic communication projects, campaigns, and PR initiatives that demonstrate my
              ability to create impact.
            </p>
          </FadeInSection>

          <Tabs defaultValue="all" className="w-full">
            <div className="flex justify-center mb-12">
              <TabsList className="bg-pink-100/50 p-1 rounded-full">
                <TabsTrigger
                  value="all"
                  className="rounded-full px-6 py-2 data-[state=active]:bg-white data-[state=active]:text-pink-600 data-[state=active]:shadow-md"
                >
                  All Projects
                </TabsTrigger>
                <TabsTrigger
                  value="campaigns"
                  className="rounded-full px-6 py-2 data-[state=active]:bg-white data-[state=active]:text-pink-600 data-[state=active]:shadow-md"
                >
                  Campaigns
                </TabsTrigger>
                <TabsTrigger
                  value="strategy"
                  className="rounded-full px-6 py-2 data-[state=active]:bg-white data-[state=active]:text-pink-600 data-[state=active]:shadow-md"
                >
                  Strategy
                </TabsTrigger>
                <TabsTrigger
                  value="content"
                  className="rounded-full px-6 py-2 data-[state=active]:bg-white data-[state=active]:text-pink-600 data-[state=active]:shadow-md"
                >
                  Content
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="mt-8">
              <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
                {/* Project 1 */}
                <FadeInSection delay={0.1}>
                  <motion.div whileHover={{ y: -10 }} className="group">
                    <Card className="overflow-hidden border-0 shadow-xl rounded-3xl">
                      <div className="aspect-video w-full overflow-hidden">
                        <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.5 }}>
                          <Image
                            src="/placeholder.svg?height=400&width=600"
                            alt="Brand Revitalization Campaign"
                            width={600}
                            height={400}
                            className="h-full w-full object-cover"
                          />
                        </motion.div>
                      </div>
                      <CardHeader>
                        <CardTitle className="text-2xl group-hover:text-pink-500 transition-colors">
                          Brand Revitalization Campaign
                        </CardTitle>
                        <CardDescription className="text-base">Digital Strategy • Content Creation</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">
                          Led a comprehensive brand refresh for a local non-profit, resulting in 40% increased
                          engagement and 25% growth in donations.
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-1 text-pink-500 hover:text-pink-600 hover:bg-pink-50 group"
                        >
                          View Case Study
                          <motion.div
                            animate={{ x: [0, 5, 0] }}
                            transition={{
                              duration: 1,
                              repeat: Number.POSITIVE_INFINITY,
                              repeatType: "loop",
                              ease: "easeInOut",
                            }}
                          >
                            <ArrowUpRight className="h-4 w-4" />
                          </motion.div>
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                </FadeInSection>

                {/* Project 2 */}
                <FadeInSection delay={0.2}>
                  <motion.div whileHover={{ y: -10 }} className="group">
                    <Card className="overflow-hidden border-0 shadow-xl rounded-3xl">
                      <div className="aspect-video w-full overflow-hidden">
                        <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.5 }}>
                          <Image
                            src="/placeholder.svg?height=400&width=600"
                            alt="Social Media Strategy"
                            width={600}
                            height={400}
                            className="h-full w-full object-cover"
                          />
                        </motion.div>
                      </div>
                      <CardHeader>
                        <CardTitle className="text-2xl group-hover:text-pink-500 transition-colors">
                          Social Media Strategy
                        </CardTitle>
                        <CardDescription className="text-base">Content Planning • Analytics</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">
                          Developed and implemented a cross-platform social media strategy that increased follower
                          growth by 65% in three months.
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-1 text-pink-500 hover:text-pink-600 hover:bg-pink-50 group"
                        >
                          View Case Study
                          <motion.div
                            animate={{ x: [0, 5, 0] }}
                            transition={{
                              duration: 1,
                              repeat: Number.POSITIVE_INFINITY,
                              repeatType: "loop",
                              ease: "easeInOut",
                            }}
                          >
                            <ArrowUpRight className="h-4 w-4" />
                          </motion.div>
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                </FadeInSection>

                {/* Project 3 */}
                <FadeInSection delay={0.3}>
                  <motion.div whileHover={{ y: -10 }} className="group">
                    <Card className="overflow-hidden border-0 shadow-xl rounded-3xl">
                      <div className="aspect-video w-full overflow-hidden">
                        <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.5 }}>
                          <Image
                            src="/placeholder.svg?height=400&width=600"
                            alt="Crisis Communication Plan"
                            width={600}
                            height={400}
                            className="h-full w-full object-cover"
                          />
                        </motion.div>
                      </div>
                      <CardHeader>
                        <CardTitle className="text-2xl group-hover:text-pink-500 transition-colors">
                          Crisis Communication Plan
                        </CardTitle>
                        <CardDescription className="text-base">Strategy • Media Relations</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">
                          Created a comprehensive crisis communication framework for a retail client, including response
                          protocols and media training.
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-1 text-pink-500 hover:text-pink-600 hover:bg-pink-50 group"
                        >
                          View Case Study
                          <motion.div
                            animate={{ x: [0, 5, 0] }}
                            transition={{
                              duration: 1,
                              repeat: Number.POSITIVE_INFINITY,
                              repeatType: "loop",
                              ease: "easeInOut",
                            }}
                          >
                            <ArrowUpRight className="h-4 w-4" />
                          </motion.div>
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                </FadeInSection>
              </div>
            </TabsContent>

            {/* Other tab contents would be similar */}
            <TabsContent value="campaigns" className="mt-8">
              <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
                <FadeInSection>
                  <motion.div whileHover={{ y: -10 }} className="group">
                    <Card className="overflow-hidden border-0 shadow-xl rounded-3xl">
                      <div className="aspect-video w-full overflow-hidden">
                        <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.5 }}>
                          <Image
                            src="/placeholder.svg?height=400&width=600"
                            alt="Awareness Campaign"
                            width={600}
                            height={400}
                            className="h-full w-full object-cover"
                          />
                        </motion.div>
                      </div>
                      <CardHeader>
                        <CardTitle className="text-2xl group-hover:text-pink-500 transition-colors">
                          Public Awareness Campaign
                        </CardTitle>
                        <CardDescription className="text-base">Campaign Strategy • Event Planning</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">
                          Designed and executed a multi-channel awareness campaign that reached over 50,000 people and
                          generated significant media coverage.
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-1 text-pink-500 hover:text-pink-600 hover:bg-pink-50 group"
                        >
                          View Case Study
                          <motion.div
                            animate={{ x: [0, 5, 0] }}
                            transition={{
                              duration: 1,
                              repeat: Number.POSITIVE_INFINITY,
                              repeatType: "loop",
                              ease: "easeInOut",
                            }}
                          >
                            <ArrowUpRight className="h-4 w-4" />
                          </motion.div>
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                </FadeInSection>
              </div>
            </TabsContent>

            <TabsContent value="strategy" className="mt-8">
              <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
                <FadeInSection>
                  <motion.div whileHover={{ y: -10 }} className="group">
                    <Card className="overflow-hidden border-0 shadow-xl rounded-3xl">
                      <div className="aspect-video w-full overflow-hidden">
                        <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.5 }}>
                          <Image
                            src="/placeholder.svg?height=400&width=600"
                            alt="Communication Strategy"
                            width={600}
                            height={400}
                            className="h-full w-full object-cover"
                          />
                        </motion.div>
                      </div>
                      <CardHeader>
                        <CardTitle className="text-2xl group-hover:text-pink-500 transition-colors">
                          Integrated Communication Strategy
                        </CardTitle>
                        <CardDescription className="text-base">Research • Strategic Planning</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">
                          Developed a comprehensive communication strategy for a tech startup, aligning messaging across
                          all touchpoints.
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-1 text-pink-500 hover:text-pink-600 hover:bg-pink-50 group"
                        >
                          View Case Study
                          <motion.div
                            animate={{ x: [0, 5, 0] }}
                            transition={{
                              duration: 1,
                              repeat: Number.POSITIVE_INFINITY,
                              repeatType: "loop",
                              ease: "easeInOut",
                            }}
                          >
                            <ArrowUpRight className="h-4 w-4" />
                          </motion.div>
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                </FadeInSection>
              </div>
            </TabsContent>

            <TabsContent value="content" className="mt-8">
              <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
                <FadeInSection>
                  <motion.div whileHover={{ y: -10 }} className="group">
                    <Card className="overflow-hidden border-0 shadow-xl rounded-3xl">
                      <div className="aspect-video w-full overflow-hidden">
                        <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.5 }}>
                          <Image
                            src="/placeholder.svg?height=400&width=600"
                            alt="Content Strategy"
                            width={600}
                            height={400}
                            className="h-full w-full object-cover"
                          />
                        </motion.div>
                      </div>
                      <CardHeader>
                        <CardTitle className="text-2xl group-hover:text-pink-500 transition-colors">
                          Content Marketing Strategy
                        </CardTitle>
                        <CardDescription className="text-base">Content Creation • Distribution</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">
                          Created and implemented a content marketing strategy that increased organic traffic by 75% and
                          lead generation by 45%.
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-1 text-pink-500 hover:text-pink-600 hover:bg-pink-50 group"
                        >
                          View Case Study
                          <motion.div
                            animate={{ x: [0, 5, 0] }}
                            transition={{
                              duration: 1,
                              repeat: Number.POSITIVE_INFINITY,
                              repeatType: "loop",
                              ease: "easeInOut",
                            }}
                          >
                            <ArrowUpRight className="h-4 w-4" />
                          </motion.div>
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                </FadeInSection>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 px-4 relative z-10 bg-white">
        <div className="max-w-6xl mx-auto">
          <FadeInSection>
            <h2 className="text-4xl font-bold text-center mb-4">Certifications & Education</h2>
            <p className="text-gray-600 text-center mb-12">
              Continuous learning is at the core of my professional development.
              Here are some of my key qualifications and certifications.
            </p>
          </FadeInSection>

          <div className="grid grid-cols-1 gap-6">
            {certifications.map((cert, index) => (
              <FadeInSection key={cert.title} delay={index * 0.1}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`${cert.color} rounded-lg p-6 transition-all duration-300 hover:shadow-md`}
                >
                  <div className="flex items-center gap-6">
                    <motion.div 
                      className="w-16 h-16 relative shrink-0"
                      whileHover={{ y: [0, -5, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <Image
                        src={cert.icon}
                        alt={cert.issuer}
                        fill
                        className="object-contain"
                      />
                    </motion.div>
                    <div className="flex-grow">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">{cert.title}</h3>
                          <p className="text-gray-600">{cert.issuer}</p>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Clock className="w-4 h-4" />
                          <span>Issued {cert.date}</span>
                        </div>
                      </div>
                      {cert.skills && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {cert.skills.map(skill => (
                            <span
                              key={skill}
                              className="px-3 py-1 bg-white/50 text-gray-700 rounded-full text-sm font-medium"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                      {cert.credentialId && (
                        <p className="mt-2 text-sm text-gray-600">
                          Credential ID: {cert.credentialId}
                        </p>
                      )}
                      {cert.showCredential && (
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="mt-4 flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                        >
                          Show credential
                          <ArrowUpRight className="w-4 h-4" />
                        </motion.button>
                      )}
                    </div>
                  </div>
                </motion.div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32">
        <div className="container max-w-6xl mx-auto px-4">
          <FadeInSection className="mb-16 text-center">
            <h2 className="text-5xl font-bold mb-6">Get In Touch</h2>
            <div className="w-24 h-2 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>
          </FadeInSection>

          <div className="grid md:grid-cols-2 gap-16">
            <FadeInSection delay={0.2}>
              <div className="space-y-12">
                <div className="space-y-6">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-start gap-6 p-6 rounded-3xl bg-white shadow-lg"
                  >
                    <div className="rounded-full bg-gradient-to-r from-pink-500 to-purple-500 p-4 text-white">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">Email</h3>
                      <p className="text-gray-600">sara.beer@example.com</p>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-start gap-6 p-6 rounded-3xl bg-white shadow-lg"
                  >
                    <div className="rounded-full bg-gradient-to-r from-pink-500 to-purple-500 p-4 text-white">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">Phone</h3>
                      <p className="text-gray-600">(352) 555-0123</p>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-start gap-6 p-6 rounded-3xl bg-white shadow-lg"
                  >
                    <div className="rounded-full bg-gradient-to-r from-pink-500 to-purple-500 p-4 text-white">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">Location</h3>
                      <p className="text-gray-600">Gainesville, Florida</p>
                    </div>
                  </motion.div>
                </div>

                <div className="flex gap-4">
                  <motion.a
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    whileTap={{ scale: 0.9 }}
                    href="#"
                    className="rounded-full bg-gradient-to-r from-pink-500 to-purple-500 p-3 text-white shadow-lg"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect width="4" height="12" x="2" y="9" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                    <span className="sr-only">LinkedIn</span>
                  </motion.a>

                  <motion.a
                    whileHover={{ scale: 1.2, rotate: -10 }}
                    whileTap={{ scale: 0.9 }}
                    href="#"
                    className="rounded-full bg-gradient-to-r from-pink-500 to-purple-500 p-3 text-white shadow-lg"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                    </svg>
                    <span className="sr-only">Twitter</span>
                  </motion.a>

                  <motion.a
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    whileTap={{ scale: 0.9 }}
                    href="#"
                    className="rounded-full bg-gradient-to-r from-pink-500 to-purple-500 p-3 text-white shadow-lg"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                    <span className="sr-only">Instagram</span>
                  </motion.a>
                </div>
              </div>
            </FadeInSection>

            <FadeInSection delay={0.4}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white p-8 rounded-3xl shadow-xl"
              >
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="relative">
                      <input
                        id="name"
                        placeholder="Your name"
                        className="w-full rounded-xl border-2 border-pink-100 bg-white px-4 py-3 text-base focus:border-pink-500 focus:outline-none"
                      />
                      <motion.div
                        className="absolute right-3 top-3 text-pink-500"
                        animate={{
                          rotate: [0, 10, 0, -10, 0],
                        }}
                        transition={{
                          duration: 5,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-6 h-6"
                        >
                          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                      </motion.div>
                    </div>

                    <div className="relative">
                      <input
                        id="email"
                        type="email"
                        placeholder="Your email"
                        className="w-full rounded-xl border-2 border-pink-100 bg-white px-4 py-3 text-base focus:border-pink-500 focus:outline-none"
                      />
                      <motion.div
                        className="absolute right-3 top-3 text-pink-500"
                        animate={{
                          rotate: [0, 10, 0, -10, 0],
                        }}
                        transition={{
                          duration: 5,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                          delay: 0.5,
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-6 h-6"
                        >
                          <rect width="20" height="16" x="2" y="4" rx="2" />
                          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                        </svg>
                      </motion.div>
                    </div>

                    <div className="relative">
                      <textarea
                        id="message"
                        placeholder="Your message"
                        className="min-h-[150px] w-full rounded-xl border-2 border-pink-100 bg-white px-4 py-3 text-base focus:border-pink-500 focus:outline-none"
                      />
                      <motion.div
                        className="absolute right-3 top-3 text-pink-500"
                        animate={{
                          rotate: [0, 10, 0, -10, 0],
                        }}
                        transition={{
                          duration: 5,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                          delay: 1,
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-6 h-6"
                        >
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                      </motion.div>
                    </div>
                  </div>

                  <GlowingButton className="w-full">
                    Send Message
                    <Send className="ml-2 h-4 w-4" />
                  </GlowingButton>
                </div>
              </motion.div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gradient-to-r from-pink-500 to-purple-500 text-white">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-center md:text-left"
            >
              <p className="text-white/80">© 2023 Sara Beer. All rights reserved.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="flex gap-6 text-sm text-white/80"
            >
              <Link href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
            </motion.div>
          </div>
        </div>
      </footer>
    </div>
  )
}
