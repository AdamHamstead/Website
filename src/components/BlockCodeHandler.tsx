// BlockCodeHandler.tsx

import React, { useState, useEffect } from 'react';
import * as parser from '@babel/parser';
import { File, Node } from '@babel/types'; // Type definitions for AST
import 'bootstrap/dist/css/bootstrap.min.css';


const sampleCode: string = `
  import React, { useState, useEffect } from 'react';

  const MyComponent = () => {
    const [count, setCount] = useState(0);

    const handleClick = () => {
      setCount(count + 1);
    };

    useEffect(() => {
      console.log("Mounted");
    }, []);

    function helperFunction() {
      return true;
    }

    return <button onClick={handleClick}>Click me</button>;
  };

  export default MyComponent;
`;

const BlockCodeHandler: React.FC = () => {
  const [isSplit, setIsSplit] = useState<boolean>(false);
  const [functionNames, setFunctionNames] = useState<string[]>([]);

  const toggleSplit = (): void => {
    setIsSplit(!isSplit);
  };

  useEffect(() => {
    // Parse the code into an AST
    const ast: File = parser.parse(sampleCode, {
      sourceType: 'module',
      plugins: ['jsx'],
    });

    const functions: string[] = [];

    const walk = (node: any): void => {
      if (!node) return;

      if (Array.isArray(node)) {
        node.forEach(walk);
      } else if (typeof node === 'object') {
        // Collect function names
        if (
          node.type === 'FunctionDeclaration' ||
          node.type === 'FunctionExpression' ||
          node.type === 'ArrowFunctionExpression'
        ) {
          if (node.id?.name) {
            functions.push(node.id.name);
          }
        }

        // Detect hook calls or function expressions
        if (
          node.type === 'VariableDeclarator' &&
          node.id?.name &&
          node.init &&
          (node.init.type === 'ArrowFunctionExpression' || node.init.type === 'FunctionExpression')
        ) {
          functions.push(node.id.name);
        }

        // Recurse into child nodes
        Object.values(node).forEach(walk);
      }
    };

    walk(ast.program.body);
    setFunctionNames(functions);
  }, []);

  return (
    <div className="position-relative vh-100">
      <button
        className="btn btn-primary position-absolute top-0 end-0 m-3"
        onClick={toggleSplit}
      >
        {isSplit ? 'Close Split' : 'Split Page'}
      </button>

      {isSplit ? (
        <div className="container-fluid h-100">
          <div className="row h-100">
            {/* Left Panel with draggable function names */}
            <div className="col-6 bg-dark text-white position-relative">
              Left Panel
            </div>

            {/* Right Panel */}
            <div className="col-6 bg-secondary text-white d-flex align-items-center justify-content-center">
              Right Panel
            </div>
          </div>
        </div>
      ) : (
        <div className="d-flex h-100 align-items-center justify-content-center bg-light">
          <h2 className="text-dark">Full Page View</h2>
        </div>
      )}
    </div>
  );
};

export default BlockCodeHandler;
