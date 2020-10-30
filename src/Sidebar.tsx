import { FC } from 'react';
import {
  Home,
  Search,
  NotificationsNone,
  MailOutline,
  BookmarkBorder,
  ListAlt,
  PermIdentity,
  MoreHoriz,
  SvgIconComponent,
  Twitter,
} from '@material-ui/icons';
import styled from 'styled-components';

import { Rows, Pad, Color, Columns, TweetButton } from './style';

const SidebarContainer = styled(Columns)`
  flex: 0.3;
  border-right: 1px solid ${Color.twitterBackground};
`;

const TwitterBlue = styled(Twitter)`
  color: ${Color.twitterBlue};
`;

export const Sidebar: FC = () => {
  return (
    <SidebarContainer pad={Pad.XSmall}>
      <SidebarOptionContainer pad={Pad.Medium}>
        <TwitterBlue />
      </SidebarOptionContainer>
      <SidebarOption Icon={Home} label="Home" />
      <SidebarOption Icon={Search} label="Explore" />
      <SidebarOption Icon={NotificationsNone} label="Notifications" />
      <SidebarOption Icon={MailOutline} label="Messages" />
      <SidebarOption Icon={BookmarkBorder} label="Bookmarks" />
      <SidebarOption Icon={ListAlt} label="Lists" />
      <SidebarOption Icon={PermIdentity} label="Profile" />
      <SidebarOption Icon={MoreHoriz} label="More" />
      <TweetButton>Tweet</TweetButton>
    </SidebarContainer>
  );
};

// SidebarOption

const SidebarOptionContainer = styled(Rows).attrs(() => ({
  center: true,
}))`
  cursor: pointer;
  border-radius: 30px;
  border: 0;
  width: min-content;
  padding: 1.65vh ${Pad.Medium};
  transition: background-color 100ms, color 100ms;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 1.1em;

  &:hover {
    background-color: ${Color.twitterBackground};
    color: ${Color.twitterBlue};
  }
`;

const SidebarOption: FC<{ Icon: SvgIconComponent; label: string }> = ({
  Icon,
  label,
}) => {
  return (
    <SidebarOptionContainer pad={Pad.Medium}>
      <Icon />
      {label && <h3>{label}</h3>}
    </SidebarOptionContainer>
  );
};
