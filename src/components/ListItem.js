import React, { Component } from 'react';
import { 
  Text, 
  TouchableWithoutFeedback, 
  View, 
  StyleSheet,
  LayoutAnimation,
  UIManager
} from 'react-native';
import { connect } from 'react-redux';
import { CardSection } from './common';
//call all export functions from file/folder
import * as actions from '../actions';

class ListItem extends Component {
  componentWillUpdate() {
    //for android.
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.spring();
  }

  //when click any title.
  renderDescription() {
    const { library, expanded } = this.props;

    if (expanded) {
      return (
        <CardSection>
          <Text style={styles.textStyle}>{library.description}</Text>
        </CardSection>
      );
    }
  }

  render() {
    const { id, title } = this.props.library;

    return (
      <TouchableWithoutFeedback
        onPress={() => this.props.selectLibrary(id) }
      >
        <View>
          <CardSection>
            <Text style={{ flex: 1 }}>
              {this.props.library.title}
            </Text>
          </CardSection>
          {this.renderDescription()}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    paddingLeft: 15
  }
});

const mapStateToProps = (state, ownProps) => {
  const expanded = state.selectedLibraryId === ownProps.library.id;

  return { expanded };
};

export default connect(mapStateToProps, actions)(ListItem);