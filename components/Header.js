import { useRouter } from 'next/router';
import React, { Component , useState} from 'react'
import { Input, Menu } from 'semantic-ui-react'


export default function Header() {
    const router = useRouter();

    let curUrl = router.route;

    let initialState = '';

    // console.log(curUrl.slice(curUrl.length - 6 , curUrl.length));
    if(curUrl.slice(curUrl.length - 6 , curUrl.length) === 'launch'){
        initialState = 'Launch New Product';
    }
    else if(curUrl.slice(curUrl.length - 4 , curUrl.length) === 'edit'){
        initialState = 'Edit Profile';
    }
    else{
        initialState = 'Launched Products';
    }


    const [activeItem, setActiveItem] = useState(initialState);

    const handleItemClick = (e, { name }) =>{ 
        setActiveItem(name)
        router.replace(`/${router.query.contractAdd}`);
    }
    const handleItemClickForLaunch = (e, { name }) =>{ 
        setActiveItem(name)
        router.replace(`/${router.query.contractAdd}/launch`);
    }
    const handleItemClickForEdit = (e, { name }) =>{ 
        setActiveItem(name)
        router.replace(`/${router.query.contractAdd}/edit`);
    }
  
  
      return (
        <Menu secondary>
          <Menu.Item
            name='Best Buy'
            active={activeItem ===  ('Launched Products' || 'Best Buy')}
            onClick={handleItemClick}
          />
          <Menu.Item
            name='Launch New Product'
            active={activeItem === 'Launch New Product'}
            onClick={handleItemClickForLaunch}
          />
          <Menu.Item
            name='Edit Profile'
            active={activeItem === 'Edit Profile'}
            onClick={handleItemClickForEdit}
          />
          <Menu.Menu position='right'>
            <Menu.Item
              name='Launched Products'
              active={activeItem === ('Launched Products' || 'Best Buy')}
              onClick={handleItemClick}
            />
          </Menu.Menu>
        </Menu>
      )
    
}

