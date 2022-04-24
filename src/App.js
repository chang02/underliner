import { useEffect, useState } from 'react';
import styled from 'styled-components';

const AppDiv = styled.div`
  width: 95vw;
  height: 95vh;
  display: flex;
`;

const Input = styled.textarea`
  width: 50%;
  height: 100%;
  margin-right: 10px;
`;

const WorkArea = styled.div`
  width: 50%;
  height: 100%;
  overflow: auto;
`;

const Block = styled.span`
  font-size: 20px;
  dipslay: inline-block;
  margin-bottom: 5px;
  cursor: pointer;
`;

function App() {
  const [input, setInput] = useState("")
  const [blocks, setBlocks] = useState([])

  const toggle = (index) => {
    blocks[index].underlined = !blocks[index].underlined
    setBlocks(JSON.parse(JSON.stringify(blocks)))
  }

  const format = (block) => {
    if (!block.underlined) {
      return block.text
    } else {
      const eng = /^[a-zA-Z]*$/; 
      var res = "";
      for (var i = 0; i < block.text.length; i++) {
        if (eng.test(block.text.charAt(i))) {
          res = res + '__'
        } else {
          res = res + block.text.charAt(i)
        }
      }
      return res;
    }
  }

  useEffect(() => {
    const list = input.split(" ")
    setBlocks(list.map((word) => {
      return {
        text: word,
        underlined: false,
      }
    }));
  }, [input])

  return (
    <AppDiv>
      <Input onChange={(e) => setInput(e.target.value)} />
      <WorkArea>
        {blocks.map((block, index) => {
          return (
            <Block key={index} onClick={() => toggle(index)}>{format(block)} </Block>
          )
        }
        )}
      </WorkArea>
    </AppDiv>
  );
}

export default App;
