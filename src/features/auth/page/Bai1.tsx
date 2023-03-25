import { Button } from 'antd';
import Form from 'antd/es/form';
import Image from 'antd/es/image';
import Select from 'antd/es/select';

import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { filter, filterAcction } from '../../FilterSplice';
import { useAppSelector } from '../../../app/hooks';
const dataJson = require('./data.json');
const tinhJson = require('./tinh_tp.json');
const quanJson = require('./quan_huyen.json');

interface itemHome {
    title: string;
    thumbnail: string;
    price: number;
    area: number;
    city: string;
    district: string;
    content: string;
}
interface selectType {
    value: string;
    label: string;
}

const money: selectType[] = [
    {
        label: 'dưới 1 tr',
        value: '1',
    },
    {
        label: '1-2tr',
        value: '2',
    },
    {
        label: '2-3tr',
        value: '3',
    },
    {
        label: '3-4tr',
        value: '4',
    },
    {
        label: '4-6tr',
        value: '5',
    },
];
const dientich: selectType[] = [
    {
        label: 'dưới 20m',
        value: '1',
    },
    {
        label: '20-30m',
        value: '2',
    },
    {
        label: '30-40m',
        value: '3',
    },
    {
        label: '40-50m',
        value: '4',
    },
    {
        label: '50-60m',
        value: '5',
    },
];
function Filter() {
    const [tinh, setTinh] = useState<selectType[]>();
    const [quan, setQuan] = useState<selectType[]>();
    const [tValue, setTvalue] = useState<string>();

    const dispatch = useDispatch();
    function LoadTinh() {
        const newArray = [];
        for (let key in tinhJson) {
            newArray.push({ label: tinhJson[key].name, value: tinhJson[key].code });
        }
        setTinh(newArray);
    }
    function LoadQuan(parentCode?: string) {
        parentCode
            ? setQuan(
                  Object.keys(quanJson)
                      .filter((key) => quanJson[key].parent_code == parentCode)
                      .map((key) => ({ value: quanJson[key].code, label: quanJson[key].name })),
              )
            : setQuan(Object.keys(quanJson).map((key) => ({ value: quanJson[key].code, label: quanJson[key].name })));
    }
    useEffect(() => {
        LoadTinh();
        LoadQuan();
        console.log(dataJson);
    }, []);
    useEffect(() => {
        console.log(tValue);
        LoadQuan(tValue);
    }, [tValue]);
    const [form] = Form.useForm();
    function onFinish(value: filter) {
        dispatch(filterAcction.setFilter(value));
    }
    return (
        <div className="container-t">
            <Form className="container" form={form} name="nest-messages" onFinish={onFinish} id="myformX">
                <Form.Item name={'tinh'} label="Tỉnh /Thành phố ">
                    <Select
                        size="large"
                        className="selectBox"
                        onSelect={(e: any) => {
                            setTvalue(e);
                        }}
                        options={tinh}
                    />
                </Form.Item>

                <Form.Item name={'mx'} label="Quận /Huyện ">
                    <Select className="selectBox" onSelect={(e: any) => {}} size="large" options={quan} />
                </Form.Item>
                <Form.Item name={'m'} label="Khoảng Giá ">
                    <Select className="selectBox" onSelect={(e: any) => {}} size="large" options={money} />
                </Form.Item>
                <Form.Item name={'dientich'} label="Diện tích">
                    <Select className="selectBox" onSelect={(e: any) => {}} size="large" options={dientich} />
                </Form.Item>
                <button className="bnt" form={'myformX'}>
                    Lọc Tin
                </button>
            </Form>
        </div>
    );
}
function ListTem() {
    const [listItem, setListItem] = useState<itemHome[]>(dataJson);
    const filter: filter = useAppSelector((state) => state.Filter);
    function filterTinh(city: string) {
        if (city) setListItem((pr) => pr.filter((item) => item.city == city));
    }
    function filterQan(quan: string) {
        if (quan) setListItem((pr) => pr.filter((item) => item.district == quan));
    }
    function filterMonney(price: string) {
        if (price) {
            switch (price) {
                case '1': {
                    setListItem((pr) => pr.filter((item) => item.price < 1000000));
                    break;
                }
                case '2': {
                    setListItem((pr) => pr.filter((item) => item.price > 1000000 && item.price < 2000000));
                    break;
                }
                case '3': {
                    setListItem((pr) => pr.filter((item) => item.price > 2000000 && item.price < 3000000));

                    break;
                }
                case '4': {
                    setListItem((pr) => pr.filter((item) => item.price > 3000000 && item.price < 4000000));

                    break;
                }
                case '5': {
                    setListItem((pr) => pr.filter((item) => item.price > 4000000 && item.price < 6000000));

                    break;
                }
            }
        }
    }
    function filterDientich(dientich: string) {
        if (dientich) {
            switch (dientich) {
                case '1': {
                    setListItem((pr) => pr.filter((item) => item.area < 20));
                    break;
                }
                case '2': {
                    setListItem((pr) => pr.filter((item) => item.area > 20 && item.area < 30));
                    break;
                }
                case '3': {
                    setListItem((pr) => pr.filter((item) => item.area > 30 && item.area < 40));

                    break;
                }
                case '4': {
                    setListItem((pr) => pr.filter((item) => item.area > 40 && item.area < 50));

                    break;
                }
                case '5': {
                    setListItem((pr) => pr.filter((item) => item.area > 50 && item.area < 60));

                    break;
                }
            }
        }
    }
    useEffect(() => {
        setListItem(dataJson);
        filterTinh(filter.tinh);
        filterQan(filter.mx);
        filterMonney(filter.m);
        filterDientich(filter.dientich);
    }, [filter]);

    return (
        <div className="conTentList">
            <div className="containerItem">
                <h2>Tin nổi bật</h2>
                {listItem.map((item, index) => (
                    <div key={index}>
                        <Item itemHome={item}></Item>
                    </div>
                ))}
            </div>
        </div>
    );
}
function Item({ itemHome }: { itemHome: itemHome }) {
    function findTinh(code: string) {
        for (let key in tinhJson) {
            if (tinhJson[key].code === code) {
                return tinhJson[key].name;
            }
        }
        return null;
    }
    function formatPrice(value: number) {
        const priceFormat = value.toLocaleString('it-IT', {
            style: 'currency',
            currency: 'VND',
        });
        return priceFormat;
    }
    function findQuan(code: string) {
        for (let key in quanJson) {
            if (quanJson[key].code === code) {
                return quanJson[key].name;
            }
        }
        return null;
    }
    return (
        <div className="box">
            <div className="image">
                <Image width={200} height={200} src={itemHome.thumbnail} />
            </div>
            <div className="decription">
                <h2>{itemHome.title}</h2>
                <h3>{formatPrice(itemHome.price)}/Tháng</h3>
                <div style={{ display: 'flex' }}>
                    <p>
                        Diện Tích:<b> {itemHome.area}</b> m2{' '}
                    </p>
                    <p className="address">
                        Khu Vực:{' '}
                        <span>
                            {findQuan(itemHome.district)}/ {findTinh(itemHome.city)}
                        </span>
                    </p>
                </div>
                <span>{itemHome.content}</span>
            </div>
        </div>
    );
}
export default function Login() {
    return (
        <>
            <Filter></Filter> <ListTem></ListTem>
        </>
    );
}
