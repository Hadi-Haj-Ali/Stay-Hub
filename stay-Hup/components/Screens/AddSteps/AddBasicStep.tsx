import React from 'react';

import AddBasicInfo from '../../ui/Add-ui/AddBasicInfo';

type Props = {
  title: string;
  description: string;
  price: string;
  type: string;

  setValue: (name: any, value: any) => void;
};

export default function AddBasicStep({
  title,
  description,
  price,
  type,
  setValue,
}: Props) {
  return (
    <AddBasicInfo
      title={title}
      setTitle={(value: string) => setValue('title', value)}
      description={description}
      setDescription={(value: string) => setValue('description', value)}
      price={price}
      setPrice={(value: string) => setValue('price', value)}
      type={type}
      setType={(value: string) => setValue('type', value)}
    />
  );
}