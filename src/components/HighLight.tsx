import React from "react";

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

export type { VideoProps, ArticleProps };
export default HighLight;
