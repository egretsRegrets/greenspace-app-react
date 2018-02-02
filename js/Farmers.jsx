// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import FarmerCardList from './FarmerCardList';
import NoFilteredEntitiesMsg from './utilComponents/NoFilteredEntitiesMsg';
import Filters from './utilComponents/Filters';
import { NextPreviousBtns } from './utilComponents/PageControls';
import { passFilterUpdateToSetter, setFilter, getSelectedFiltersMap, filterStateIsInitial } from './utils';
import { setFarmersFilters } from './actionCreators';

type Props = { farmers: Array<FarmerBrief>, filters: genFilters, filtersSetter: Function };

type State = {
  pageNumber: number
};

class Farmers extends Component<Props, State> {
  state = {
    pageNumber: 1
  };

  componentWillReceiveProps(nextProps) {
    // if filters will be changed, then we need to reset the current page to page 1
    if (this.props.filters !== nextProps.filters) {
      this.updatePage(1);
    }
  }

  updatePage = (val: number) => this.setState({ pageNumber: parseInt(val, 10) });

  passesExperienceFilter = (farmerExperience: farmingExperienceLevel, selectedFilters: Array<string>) => {
    if (filterStateIsInitial(selectedFilters)) {
      return true;
    }
    if (selectedFilters.includes(farmerExperience)) {
      return true;
    }
    return false;
  };
  passesSkillsFilter = (farmerSkills: Array<farmingSkills> | typeof undefined, selectedFilters: Array<string>) => {
    if (filterStateIsInitial(selectedFilters)) {
      return true;
    }
    // User/FarmerBrief.skills is an optional property, so we need to account for it not being available
    if (!farmerSkills) {
      return false;
    }
    // if any of the selectedFilters are in farmerSkills return true - the farmer is filtered in
    for (let i = 0; i < selectedFilters.length; i += 1) {
      if (farmerSkills.includes(selectedFilters[i])) {
        return true;
      }
    }
    return false;
  };

  filterFarmers = () => {
    const selectedFiltersMap: { experience: Array<string>, skills: Array<string> } = getSelectedFiltersMap(
      this.props.filters
    );
    const filteredFarmers = this.props.farmers.filter(
      farmer =>
        this.passesExperienceFilter(farmer.experience, selectedFiltersMap.experience) &&
        this.passesSkillsFilter(farmer.skills, selectedFiltersMap.skills)
    );
    return filteredFarmers;
  };

  render() {
    const cardsPerPage = 8;

    return (
      <section className="ph5">
        <Filters
          filterCat="farmers"
          filters={this.props.filters}
          updateFilters={resolveFiltersParams =>
            passFilterUpdateToSetter(resolveFiltersParams, this.props.filtersSetter)
          }
        />
        <NoFilteredEntitiesMsg entities={this.filterFarmers()} entitiesType="farmers" />
        <FarmerCardList
          farmerCardList={this.filterFarmers()}
          currentPageNumber={this.state.pageNumber}
          cardsPerPage={cardsPerPage}
        />
        <NextPreviousBtns
          pageNumber={this.state.pageNumber}
          dataLength={this.filterFarmers().length}
          cardsPerPage={cardsPerPage}
          clickHandler={this.updatePage}
        />
      </section>
    );
  }
}

const mapStateToProps = state => ({ filters: state.farmersFilters });
const mapDispatchToProps = (dispatch: Function) => ({
  filtersSetter(resolveFiltersParams: resolveFiltersParams) {
    setFilter(resolveFiltersParams, setFarmersFilters, dispatch);
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Farmers);
