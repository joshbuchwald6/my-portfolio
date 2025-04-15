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

const NavItem = ({ href, children }: { href: string, children: React.ReactNode }) => {
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Link 
        href={href} 
        className="flex items-center gap-2 px-6 py-2 text-gray-600 hover:text-gray-900 transition-colors"
        onClick={(e: React.MouseEvent) => {
          e.preventDefault()
          const target = document.querySelector(href)
          if (target) {
            const offset = 100 // Offset for the sticky header
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth',
            })
            // Add a more natural easing with JavaScript
            const start = window.pageYOffset
            const startTime = performance.now()
            const duration = 1500 // Increased duration to 1.5 seconds
            
            const easeInOutCubic = (t: number) => 
              t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1

            const animateScroll = (currentTime: number) => {
              const timeElapsed = currentTime - startTime
              const progress = Math.min(timeElapsed / duration, 1)
              
              const easedProgress = easeInOutCubic(progress)
              const distance = targetPosition - start
              
              window.scrollTo(0, start + distance * easedProgress)
              
              if (progress < 1) {
                requestAnimationFrame(animateScroll)
              }
            }
            
            requestAnimationFrame(animateScroll)
          }
        }}
      >
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
      icon: "/images/linkedin.svg",
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
      icon: "/images/hootsuite.svg",
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
        <div className="container max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center"
          >
            <nav className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 bg-white/80 backdrop-blur-lg rounded-full shadow-lg border border-gray-100">
              <NavItem href="#home">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 sm:w-5 sm:h-5">
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                <span className="hidden sm:inline">Home</span>
              </NavItem>
              <NavItem href="#about">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 sm:w-5 sm:h-5">
                  <circle cx="12" cy="8" r="5" />
                  <path d="M20 21a8 8 0 1 0-16 0" />
                </svg>
                <span className="hidden sm:inline">About</span>
              </NavItem>
              <NavItem href="#work">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 sm:w-5 sm:h-5">
                  <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                </svg>
                <span className="hidden sm:inline">Work</span>
              </NavItem>
              <NavItem href="#contact">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 sm:w-5 sm:h-5">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <span className="hidden sm:inline">Contact</span>
              </NavItem>
            </nav>
          </motion.div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center py-16 md:py-32">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="flex flex-col items-center text-center space-y-8 md:space-y-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight">Sara Beer</h1>
              <motion.div
                className="absolute -top-4 sm:-top-6 md:-top-8 -right-4 sm:-right-6 md:-right-8 text-pink-500"
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
                <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
              </motion.div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="text-lg sm:text-xl text-gray-600 max-w-2xl px-4"
            >
              Combined Degree Public Relations Student at the University of Florida
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full max-w-[280px] mx-auto px-4"
            >
              <div className="w-full sm:w-[280px]">
                <GlowingButton className="w-full" onClick={(e) => {
                  e.preventDefault()
                  const target = document.querySelector('#contact')
                  if (target) {
                    const offset = 100
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset
                    
                    const start = window.pageYOffset
                    const startTime = performance.now()
                    const duration = 1500
                    
                    const easeInOutCubic = (t) => 
                      t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1

                    const animateScroll = (currentTime) => {
                      const timeElapsed = currentTime - startTime
                      const progress = Math.min(timeElapsed / duration, 1)
                      
                      const easedProgress = easeInOutCubic(progress)
                      const distance = targetPosition - start
                      
                      window.scrollTo(0, start + distance * easedProgress)
                      
                      if (progress < 1) {
                        requestAnimationFrame(animateScroll)
                      }
                    }
                    
                    requestAnimationFrame(animateScroll)
                  }
                }}>Get In Touch</GlowingButton>
              </div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-[280px]">
                <Link href="/pdfs/sararesume.pdf" target="_blank">
                  <Button variant="outline" size="lg" className="w-full border-2 border-gray-300">
                    View Resume
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="absolute left-1/2 -translate-x-1/2 bottom-8 sm:bottom-12 cursor-pointer flex justify-center w-full"
          animate={{ 
            y: [0, 15, 0],
            opacity: [0.6, 1, 0.6]
          }}
          transition={{ 
            duration: 2.5, 
            repeat: Number.POSITIVE_INFINITY, 
            ease: "easeInOut" 
          }}
          onClick={() => {
            const aboutSection = document.querySelector('#about')
            if (aboutSection) {
              aboutSection.scrollIntoView({ behavior: 'smooth' })
            }
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-8 h-8 sm:w-10 sm:h-10 text-gray-600 hover:text-pink-500 transition-colors"
          >
            <path d="M12 5v14" />
            <path d="m19 12-7 7-7-7" />
          </svg>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 md:py-32 bg-gradient-to-b from-white to-pink-50">
        <div className="container max-w-6xl mx-auto px-4">
          <FadeInSection className="mb-8 sm:mb-12 md:mb-16 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">About Me</h2>
            <div className="w-16 sm:w-24 h-2 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto rounded-full"></div>
          </FadeInSection>

          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            <FadeInSection delay={0.2}>
              <div className="relative max-w-sm sm:max-w-md mx-auto md:max-w-none">
                <RotatingElement className="relative z-10">
                  <div className="rounded-3xl overflow-hidden border-8 border-white shadow-xl">
                    <Image
                      src="/images/headshot.png"
                      alt="Sara Beer"
                      width={600}
                      height={600}
                      className="w-full h-auto"
                    />
                  </div>
                </RotatingElement>

                <motion.div
                  className="absolute -bottom-4 sm:-bottom-8 -right-4 sm:-right-8 bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-lg z-20"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-full p-2 sm:p-3">
                      <Award className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm sm:text-base font-bold">UF Combined Degree</p>
                      <p className="text-xs sm:text-sm text-gray-500">PR Excellence</p>
                    </div>
                  </div>
                </motion.div>

                <div className="absolute -z-10 w-full h-full bg-gradient-to-r from-pink-300 to-purple-300 rounded-3xl -bottom-4 sm:-bottom-6 -right-4 sm:-right-6"></div>
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
                  <Link 
                    href="https://www.linkedin.com/in/sara-beer/"
                    target="_blank"
                    className="inline-flex items-center px-6 py-3 text-white bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg hover:from-pink-600 hover:to-purple-600 transition-all duration-200"
                  >
                    Learn More
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </motion.div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Work Experience */}
      <section id="work" className="py-16 md:py-32">
        <div className="container max-w-6xl mx-auto px-4">
          <FadeInSection className="mb-12 md:mb-16 text-center">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">My Work</h2>
            <div className="w-24 h-2 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto rounded-full mb-6"></div>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              A showcase of my strategic communication projects, campaigns, and PR initiatives that demonstrate my
              ability to create impact.
            </p>
          </FadeInSection>

          <div className="grid gap-6 sm:gap-8 md:gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {/* Project 1 */}
            <FadeInSection delay={0.1}>
              <motion.div whileHover={{ y: -10 }} className="group h-full">
                <Card className="overflow-hidden border-0 shadow-xl rounded-3xl h-full flex flex-col">
                  <div className="aspect-[16/9] w-full overflow-hidden bg-white flex items-center justify-center p-8">
                    <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.5 }} className="relative w-full h-full">
                      <Image
                        src="/images/CYM.jpg"
                        alt="Brand Revitalization Campaign"
                        fill
                        className="object-contain"
                      />
                    </motion.div>
                  </div>
                  <CardHeader className="flex-none">
                    <CardTitle className="text-xl group-hover:text-pink-500 transition-colors">
                      Brand Revitalization Campaign
                    </CardTitle>
                    <CardDescription className="text-sm">Digital Strategy • Content Creation</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-gray-600 text-sm">
                      Led a comprehensive brand refresh for a local non-profit, resulting in 40% increased
                      engagement and 25% growth in donations.
                    </p>
                  </CardContent>
                  <CardFooter className="flex-none">
                    <Link href="/pdfs/cym-case-study.pdf" target="_blank">
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
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            </FadeInSection>

            {/* Project 2 */}
            <FadeInSection delay={0.2}>
              <motion.div whileHover={{ y: -10 }} className="group h-full">
                <Card className="overflow-hidden border-0 shadow-xl rounded-3xl h-full flex flex-col">
                  <div className="aspect-[16/9] w-full overflow-hidden bg-white flex items-center justify-center p-8">
                    <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.5 }} className="relative w-full h-full">
                      <Image
                        src="/images/ebay.svg"
                        alt="eBay Marketing Campaign"
                        fill
                        className="object-contain"
                      />
                    </motion.div>
                  </div>
                  <CardHeader className="flex-none">
                    <CardTitle className="text-xl group-hover:text-pink-500 transition-colors">
                      eBay Marketing Campaign
                    </CardTitle>
                    <CardDescription className="text-sm">Content Planning • Analytics</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-gray-600 text-sm">
                      Developed and implemented a cross-platform marketing strategy that increased sales
                      by 65% in three months.
                    </p>
                  </CardContent>
                  <CardFooter className="flex-none">
                    <Link href="/pdfs/ebay-case-study.pdf" target="_blank">
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
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            </FadeInSection>

            {/* Project 3 */}
            <FadeInSection delay={0.3}>
              <motion.div whileHover={{ y: -10 }} className="group h-full">
                <Card className="overflow-hidden border-0 shadow-xl rounded-3xl h-full flex flex-col">
                  <div className="aspect-[16/9] w-full overflow-hidden bg-white flex items-center justify-center p-8">
                    <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.5 }} className="relative w-full h-full">
                      <Image
                        src="/images/Nikon_Logo.svg"
                        alt="Nikon Product Launch"
                        fill
                        className="object-contain"
                      />
                    </motion.div>
                  </div>
                  <CardHeader className="flex-none">
                    <CardTitle className="text-xl group-hover:text-pink-500 transition-colors">
                      Nikon Product Launch
                    </CardTitle>
                    <CardDescription className="text-sm">Strategy • Media Relations</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-gray-600 text-sm">
                      Created a comprehensive product launch campaign for Nikon's latest DSLR camera,
                      achieving 150% of sales targets.
                    </p>
                  </CardContent>
                  <CardFooter className="flex-none">
                    <Link href="/pdfs/nikon-case-study.pdf" target="_blank">
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
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            </FadeInSection>

            {/* Project 4 */}
            <FadeInSection delay={0.4}>
              <motion.div whileHover={{ y: -10 }} className="group h-full">
                <Card className="overflow-hidden border-0 shadow-xl rounded-3xl h-full flex flex-col">
                  <div className="aspect-[16/9] w-full overflow-hidden bg-white flex items-center justify-center p-8">
                    <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.5 }} className="relative w-full h-full">
                      <Image
                        src="/images/alphapr.png"
                        alt="Alpha PR Campaign"
                        fill
                        className="object-contain"
                      />
                    </motion.div>
                  </div>
                  <CardHeader className="flex-none">
                    <CardTitle className="text-xl group-hover:text-pink-500 transition-colors">
                      Alpha PR Campaign
                    </CardTitle>
                    <CardDescription className="text-sm">Brand Strategy • Digital Marketing</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-gray-600 text-sm">
                      Spearheaded a comprehensive PR campaign for Alpha, resulting in
                      300% increase in brand visibility and successful market positioning.
                    </p>
                  </CardContent>
                  <CardFooter className="flex-none">
                    <Link href="/pdfs/alphapr.pdf" target="_blank">
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
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            </FadeInSection>
          </div>
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
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div>
                          <h3 className="text-lg sm:text-xl font-semibold text-gray-900">{cert.title}</h3>
                          <p className="text-gray-600 text-sm sm:text-base">{cert.issuer}</p>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500 whitespace-nowrap">
                          <Clock className="w-4 h-4 shrink-0" />
                          <span>Issued {cert.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-32 bg-white">
        <div className="container max-w-6xl mx-auto px-4">
          <FadeInSection className="mb-12 md:mb-16 text-center">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">Get In Touch</h2>
            <div className="w-24 h-2 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto rounded-full mb-6"></div>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>
          </FadeInSection>

          <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-3xl mx-auto">
            <FadeInSection delay={0.2}>
              <motion.a
                href="mailto:sarajbeer@gmail.com"
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center gap-4 p-6 rounded-3xl bg-white shadow-lg hover:shadow-xl transition-all"
              >
                <div className="rounded-full bg-gradient-to-r from-pink-500 to-purple-500 p-4 text-white">
                  <Mail className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Email</h3>
                <p className="text-gray-600 text-center">sarajbeer@gmail.com</p>
              </motion.a>
            </FadeInSection>

            <FadeInSection delay={0.3}>
              <motion.a
                href="tel:+13055223176"
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center gap-4 p-6 rounded-3xl bg-white shadow-lg hover:shadow-xl transition-all"
              >
                <div className="rounded-full bg-gradient-to-r from-pink-500 to-purple-500 p-4 text-white">
                  <Phone className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Phone</h3>
                <p className="text-gray-600 text-center">(305) 522-3176</p>
              </motion.a>
            </FadeInSection>

            <FadeInSection delay={0.4}>
              <motion.a
                href="https://www.linkedin.com/in/sara-beer/"
                target="_blank"
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center gap-4 p-6 rounded-3xl bg-white shadow-lg hover:shadow-xl transition-all"
              >
                <div className="rounded-full bg-gradient-to-r from-pink-500 to-purple-500 p-4 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">LinkedIn</h3>
                <p className="text-gray-600 text-center">Connect with me</p>
              </motion.a>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-white">
        <div className="container max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <p className="text-gray-600">© 2025 Sara Beer. All rights reserved.</p>
          </motion.div>
        </div>
      </footer>
    </div>
  )
}
