import React from "react";
import Video from "./Video";
import Article from "./Article";
import HighLight, { VideoProps, ArticleProps } from "./HighLight";

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

export default List;
