import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import classNames from "classnames";
import { FaGithub } from "react-icons/fa";

const ProjectsSection = () => {
  const [selectedPort, setSelectedPort] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isClosing, setIsClosing] = useState(false);
  const [visiblePosts, setVisiblePosts] = useState({});
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const [isTitleVisible, setIsTitleVisible] = useState(false);
  const modalRef = useRef(null);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    let url = `${process.env.REACT_APP_API_ROOT}/posts`;
    axios.get(url).then((res) => {
      setPosts(res.data);
    });
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    if (selectedPort) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedPort]);

  useEffect(() => {
    const observerOptions = {
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        setVisiblePosts((prev) => ({
          ...prev,
          [entry.target.dataset.id]: entry.isIntersecting,
        }));
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    const postElements = document.querySelectorAll(".post-item");
    postElements.forEach((element) => observer.observe(element));

    return () => {
      postElements.forEach((element) => observer.unobserve(element));
    };
  }, [posts]);

  useEffect(() => {
    const sectionElement = sectionRef.current;
    const sectionObserverOptions = {
      threshold: 0.1,
    };

    const sectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsSectionVisible(true);
        }
      });
    };

    const sectionObserver = new IntersectionObserver(
      sectionObserverCallback,
      sectionObserverOptions
    );

    if (sectionElement) {
      sectionObserver.observe(sectionElement);
    }

    return () => {
      if (sectionElement) {
        sectionObserver.unobserve(sectionElement);
      }
    };
  }, []);

  useEffect(() => {
    const titleElement = titleRef.current;
    const titleObserverOptions = {
      threshold: 0.1,
    };

    const titleObserverCallback = (entries) => {
      entries.forEach((entry) => {
        setIsTitleVisible(entry.isIntersecting);
      });
    };

    const titleObserver = new IntersectionObserver(
      titleObserverCallback,
      titleObserverOptions
    );

    if (titleElement) {
      titleObserver.observe(titleElement);
    }

    return () => {
      if (titleElement) {
        titleObserver.unobserve(titleElement);
      }
    };
  }, []);

  const openModal = (port) => {
    setSelectedPort(port);
    setIsClosing(false);
  };

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setSelectedPort(null);
      setIsClosing(false);
    }, 200);
  };

  return (
    <div
      id="projects"
      ref={sectionRef}
      className="w-[90%] pt-14 md:pt-20 mx-auto">
      <h1
        ref={titleRef}
        className={classNames(
          "text-[#c4cfde] text-[34px] md:text-[40px] lg:text-[60px] my-2 text-center font-bold transform transition-all duration-1000",
          {
            "translate-y-0 opacity-100": isTitleVisible,
            "translate-y-10 opacity-0": !isTitleVisible,
          }
        )}>
        Projects
      </h1>
      <div className="w-full my-8 flex gap-2 md:gap-6 overflow-x-auto pb-0 md:pb-8 scrollbar-none">
        {posts.map((post) => (
          <div
            key={post.id}
            data-id={post.id}
            onClick={() => openModal(post)}
            className={classNames(
              "post-item min-w-[85%] px-3 md:px-8 py-4 md:min-w-[45%] mb-7 md:mb-0 w-full home-icon-btn rounded-xl flex justify-center items-center flex-col cursor-pointer hover:bg-[#2e3136] drop-shadow-2xl hover:drop-shadow-md duration-500",
              {
                "translate-x-0 opacity-100":
                  visiblePosts[post.id] && isSectionVisible,
                "translate-x-10 opacity-0":
                  !visiblePosts[post.id] || !isSectionVisible,
              }
            )}>
            <div className="w-full mb-1 pt-0 md:pt-4">
              <img
                src={post.featured_image_url}
                alt={post.title.rendered}
                className="w-full h-56 md:h-96 rounded-xl object-cover shadow-2xl hover:scale-[101%] duration-500"
              />
            </div>
            <div className="w-full flex px-1 my-3 justify-between">
              <p className="text-[#c4cfde] text-[24px] font-bold max-h-12 overflow-hidden text-ellipsis whitespace-nowrap">
                {post.title.rendered}
              </p>
            </div>
          </div>
        ))}
      </div>
      {selectedPort && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-[9999] bg-black bg-opacity-30 transition-opacity duration-500">
          <div
            ref={modalRef}
            className={`bg-[#212428] w-5/6 rounded-xl ${
              isClosing ? "animate-slide-down" : "animate-slide-up"
            }`}>
            <div className="w-[100%] h-[450px] md:h-auto relative md:flex-row flex-col justify-center md:gap-[5%] port-click-overlay-bg md:px-8 py-8 md:py-14 items-center flex rounded-xl">
              <div className="relative xl:w-[45%] w[90%] sm:w-[60%] md:w-[50] md:mb-0 lg:w-[60%] rounded-xl overflow-hidden shadow-2xl">
                <img
                  src={selectedPort.featured_image_url}
                  alt={selectedPort.title.rendered}
                  className="w-64 h-auto md:w-full md:h-96 object-contain md:object-cover"
                />
                {selectedPort.github_link && (
                  <a
                    href={selectedPort.github_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-2 right-2 bg-[#2e3136] hover:bg-[#32363b] duration-500 cursor-pointer p-2.5 rounded-full">
                    <FaGithub className="text-white" />
                  </a>
                )}
              </div>
              <div className="xl:w-[45%] w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] h-96 overflow-hidden flex flex-col justify-center scrollbar-none">
                <div className="flex flex-wrap items-center justify-center md:justify-start mt-3 md:mt-10 md:-ml-2">
                  {selectedPort.icons &&
                    selectedPort.icons.map((icon, index) => (
                      <img
                        key={index}
                        src={icon}
                        alt={`icon-${index}`}
                        className="w-[38px] h-[38px] md:w-[43px] md:h-[43px] bg-[#2e3136] hover:bg-[#32363b] duration-500 cursor-pointer p-2.5 rounded-full ml-2 object-contain"
                      />
                    ))}
                </div>
                <h5 className="text-[#c4cfde] text-[34px] font-semibold text-center md:text-left whitespace-nowrap overflow-x-auto min-h-14 mt-4">
                  {selectedPort.title.rendered}
                </h5>
                <h1 className="h-80 md:mt-4 text-[15px] md:text-[18px] text-[#c4cfde] text-center md:text-left pl-2 pr-2 md:pl-0 md:pr-0 overflow-y-auto">
                  {selectedPort.excerpt.rendered}
                </h1>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsSection;
