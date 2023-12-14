import React, { useState } from "react";
import styled from "styled-components";
import { CommonInfo } from "../../components/organisms/CommonInfo";
import { AttributeBookInfo } from "../../components/organisms/AttributeBookInfo";
import { AttributeSoftInfo } from "../../components/organisms/AttributeSoftInfo";
import { AuthorInfo } from "../../components/organisms/AuthorInfo";
import { Comment } from "../../components/organisms/Comment";
import { Tag } from "../../components/organisms/Tag";
import { useQueryUpdateItem } from "../../api/useQueryUpdateItem";

const Tab = styled.button`
  font-size: 20px;
  padding: 10px 60px;
  cursor: pointer;
  opacity: 0.6;
  background: #292961;
  border: 0;
  outline: 0;
  color: white;
  width: 20em;
  ${({ active }) =>
    active &&
    `
    border-bottom: 2px solid red;
    opacity: 1;
  `}
`;
const ButtonGroup = styled.div`
  display: flex;
`;
const TabData = styled.div`
  border: 1px solid #dcdcdc;
  padding: 10px;
  border-radius: 3px;
`;
const types = ["共通情報", "属性情報", "著作者", "コメント", "タグ"];

export const TabLists = () => {
  const [tagType, setTagType] = useState(types[0]);
  const [tagData, setTagData] = useState(<CommonInfo />);
  const { show } = useQueryUpdateItem();

  const onClickTab = (typeValue) => {
    setTagType(typeValue);

    switch (typeValue) {
      case "共通情報":
        setTagData(<CommonInfo />);
        break;
      case "属性情報":
        return show === "BookItem"
          ? setTagData(<AttributeBookInfo />)
          : show === "SoftItem"
          ? setTagData(<AttributeSoftInfo />)
          : null;
        break;
      case "著作者":
        setTagData(<AuthorInfo />);
        break;
      case "コメント":
        setTagData(<Comment />);
        break;
      case "タグ":
        setTagData(<Tag />);
        break;
    }
  };

  return (
    <>
      <ButtonGroup>
        {types.map((type) => (
          <Tab
            key={type}
            active={tagType === type}
            onClick={() => onClickTab(type)}
          >
            {type}
          </Tab>
        ))}
      </ButtonGroup>
      <p />
      <TabData> {tagData} </TabData>
    </>
  );
};
