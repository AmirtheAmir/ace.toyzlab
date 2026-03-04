// declare module '*.svg' {
//     import { FC, SVGProps } from 'react'
//     const content: FC<SVGProps<SVGElement>>
//     export default content
//   }
  
//   declare module '*.svg?url' {
//     const content: string
//     export default content
//   }
// svgr.d.ts
declare module "*.svg" {
    import * as React from "react";
    const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    export default ReactComponent;
  }
  
  declare module "*.svg?url" {
    const content: string;
    export default content;
  }
  