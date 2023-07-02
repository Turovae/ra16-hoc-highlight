import React, { useState } from "react";

interface VideoProps {
  id: number;
  type: "video";
  url: string;
  views: number;
}

interface ArticleProps {
  id: number;
  type: "article";
  title: string;
  views: number;
}

function New(props: { children: JSX.Element }) {
  return (
    <div className="wrap-item wrap-item-new">
      <span className="label">New!</span>
      {props.children}
    </div>
  );
}

function Popular(props: { children: JSX.Element }) {
  return (
    <div className="wrap-item wrap-item-popular">
      <span className="label">Popular!</span>
      {props.children}
    </div>
  );
}

function Article(props: { title: string; views: number }) {
  return (
    <div className="item item-article">
      <h3>
        <a href="#">{props.title}</a>
      </h3>
      <p className="views">Прочтений: {props.views}</p>
    </div>
  );
}

function Video(props: { type: string; url: string; views: number }) {
  return (
    <div className="item item-video">
      <iframe
        src={props.url}
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
      ></iframe>
      <p className="views">Просмотров: {props.views}</p>
    </div>
  );
}

function HighLight<T extends VideoProps | ArticleProps>(
  Component: React.ComponentType<T>
) {
  return class extends React.Component<Record<"views", number>> {
    render() {
      const props = { ...(this.props as T) };
      if (this.props.views >= 1000) {
        return (
          <Popular>
            <Component {...props} />
          </Popular>
        );
      }
      if (this.props.views < 100) {
        return (
          <New>
            <Component {...props} />
          </New>
        );
      }
      return <Component {...props} />;
    }
  };
}

function List(props: {
  list: (
    | {
        id: number;
        type: string;
        url: string;
        views: number;
        title?: undefined;
      }
    | {
        id: number;
        type: string;
        title: string;
        views: number;
        url?: undefined;
      }
  )[];
}) {
  return props.list.map((item) => {
    let Component;
    switch (item.type) {
      case "video":
        Component = Video;
        break;
      case "article":
        Component = Article;
        break;
    }

    const Highlighted = HighLight(
      Component as React.ComponentType<VideoProps | ArticleProps>
    );
    return <Highlighted key={item.id} {...item} />;
  });
}

export default function App() {
  const [list] = useState([
    {
      id: 1,
      type: "video",
      url: "https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0",
      views: 50,
    },
    {
      id: 2,
      type: "video",
      url: "https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0",
      views: 12,
    },
    {
      id: 3,
      type: "article",
      title: "Невероятные события в неизвестном поселке...",
      views: 175,
    },
    {
      id: 4,
      type: "article",
      title: "Секретные данные были раскрыты!",
      views: 1532,
    },
    {
      id: 5,
      type: "video",
      url: "https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0",
      views: 4253,
    },
    {
      id: 6,
      type: "article",
      title: "Кот Бегемот обладает невероятной...",
      views: 12,
    },
  ]);

  return <List list={list} />;
}
