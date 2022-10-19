import FileTree from './fileTree';

export function createFileTree(input) {
  const fileTree = new FileTree();
const root = input.filter((info)=> info.parentId === undefined);
const child = input.filter((info)=> info.parentId !== undefined).sort((a,b)=> a.id - b.id);
input = [...root,...child];
  for (const inputNode of input) {
    const parentNode = inputNode.parentId
      ? fileTree.findNodeById(inputNode.parentId)
      : null;

    fileTree.createNode(
      inputNode.id,
      inputNode.name,
      inputNode.type,
      parentNode
    );
  }

  return fileTree;
}