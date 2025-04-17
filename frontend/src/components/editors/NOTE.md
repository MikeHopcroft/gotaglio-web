Various record editors depend on the Editor component that is one level up.
The Editor component depends on the useRouteData() hook, which is also one level up.
useRouteData() depends on RouteDataContext, which is used by RouteDataProvider.

Question is how to organize code without circular dependencies.

~~~typescript
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';


// Custom component to render special icons
const IconRenderer = ({iconName}: {iconName: string}) => {
  switch (iconName) {
    case 'plus':
      return <PlusCircleIcon className="size-6 text-blue-500 hover:text-blue-700" />;
    // Add more cases for other icons as needed
    default:
      return <span>{iconName}</span>;
  }
};

// Markdown components mapping
const markdownComponents = {
  // Example: Render `:iconName:` as a special icon
  text: ({node, children}: any) => {
    const match = /:([a-zA-Z0-9_-]+):/.exec(children);
    if (match) {
      return <IconRenderer iconName={match[1]} />;
    }
    return <>{children}</>;
  },
};

{/* Example Markdown rendering */}
<ReactMarkdown components={markdownComponents} remarkPlugins={[remarkGfm]}>
  {`This is a markdown with an icon: :plus:`}
</ReactMarkdown>

~~~