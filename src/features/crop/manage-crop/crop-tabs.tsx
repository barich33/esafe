import { Tabs, Typography } from 'antd';
/* eslint-disable-next-line */
export interface FinancialTabsProps {}

const FinancialTabs = (props: FinancialTabsProps) => {
  const { TabPane } = Tabs;
  const { Title } = Typography;
  return (
    <>
    <Title style={{fontWeight: 'bold'}} level={2}>Crop Registry</Title>
    <div style={{backgroundColor:'#E8E8E8'}}>
   {/*  <Tabs defaultActiveKey="1" className="p-3">
      <TabPane tab="Overview" key={'1'}><FinancialOverviewTabPane/></TabPane>
      <TabPane tab="Performance" key={'2'}><FinancialPerformanceTabPane/></TabPane>
      <TabPane tab="Scorecard" key={'3'}><FinancialScoreCardTabPane/></TabPane>
      <TabPane tab="Markets" key={'4'}><FinancialMarketsTabPane/></TabPane>
      <TabPane tab="Trends" key={'5'}><FinancialTrendsTabPane/></TabPane>
      <TabPane style={{backgroundColor:"#ffffff"}} tab="Downloads" key={'6'}><FinancialDownloadsTabPane/>      
      </TabPane>
    </Tabs> */}
    </div>
      </>
  );
}

export default FinancialTabs;
