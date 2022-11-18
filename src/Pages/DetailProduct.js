import { Container, Image, Button } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import { DataMenuList } from '../data/DataMenuList';
import { DataTopingList } from '../data/DataTopingList';

export const DetailProduct = () => {
  const { id } = useParams();
  return (
    <Container
    className="row m-auto"
    style={{padding : "30px 90px"}}
    >
        <div className="mb-4 col-5 pe-5">
            <Image src={DataMenuList[id - 1].image} width="100%"/>
        </div>
        <div className="col-7" style={{ fontSize: "1.15rem" }}>
            <h3 className="fs-1 fw-bolder mb-3 text-danger">{DataMenuList[id - 1].menuName}</h3>
            <p className="fs-4 fw-semibold mb-5" style={{color : "#984c4c"}}>Rp. {DataMenuList[id - 1].price}.000</p>
            <p className="fs-2 fw-bold" style={{color : "#984c4c"}}>Toping</p>
            <div className="row">
                {DataTopingList.map((item) => (
                    <div className='col-3 text-center p-0 mb-2 mt-3'>
                        <img src={item.image} className="w-50 mb-2"/>
                        <p className="fs-6 fw-semibold text-danger">{item.topingName}</p>
                    </div>
                ))}
            </div>
            <div className='row justify-content-between mt-5 mb-3' style={{color : "#984c4c"}}>
                <p className="col-3 fs-4 fw-bolder">Total</p>
                <p className="col-3 fs-4 fw-bolder text-end">Rp. 31.000</p>
            </div>
            <Button variant='danger' className="w-100 fw-bold">Add Cart</Button>
        </div>
    </Container>
  );
};