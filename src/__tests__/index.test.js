import ReactTimeframe from '../index';

describe('<ReactTimeframe />', () => {

  it('renders correctly', () => {
    const component = shallow(<ReactTimeframe />);

    expect(component).toMatchSnapshot();
  });

})