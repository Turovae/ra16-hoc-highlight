import React, { useState } from "react";

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

function List(props: {
  list: {
    id: number;
    type: string;
    url?: string;
    title?: string;
    views: number;
  }[];
}) {
  return props.list.map((item) => {
    switch (item.type) {
      case "video":
        return <Video {...item} />;

      case "article":
        return <Article {...item} />;
    }
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
