// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract CrowdFunding {
    struct Campaign {
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountColl;
        string image;
        address[] donators;
        uint256[] donations;
    }

    mapping (uint256 => Campaign) public allCampaigns;

    uint256 public numberOfCampaigns = 0;

    function createCampaign(
        address _owner, 
        string memory _title, 
        string memory _description, 
        uint256 _target,
        uint256 _deadline,
        string memory _image
        ) public returns (uint256) {

        Campaign storage campaign = allCampaigns[numberOfCampaigns];

        require(campaign.deadline < block.timestamp, "The deadLine should be a date in Future..");

        campaign.owner = _owner;
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.amountColl = 0;
        campaign.image = _image;

        numberOfCampaigns++;

        return numberOfCampaigns-1;

    }

    function donateToCampaign(uint256 _id) public payable {
        uint256 amount = msg.value;

        Campaign storage campaign = allCampaigns[_id];

        campaign.donators.push(msg.sender);
        campaign.donations.push(amount);

        (bool sent, ) = payable(campaign.owner).call{value: amount}("");

        if(sent){
            campaign.amountColl = campaign.amountColl + amount;
        }

    }

    function getDonators(uint256 _id) view public returns (address[] memory, uint256[] memory) {
        return (allCampaigns[_id].donators, allCampaigns[_id].donations);
    }


    function getCompaigns() public view returns (Campaign[] memory) {
        Campaign[] memory allCampaignList = new Campaign[](numberOfCampaigns);

        for(uint i = 0; i<numberOfCampaigns; i++){
            Campaign storage item = allCampaigns[i];

            allCampaignList[i] = item;
        }
        return allCampaignList;
    }
}