import {StyleSheet} from 'react-native';
// import { Color } from 'react-native/types_generated/Libraries/Animated/AnimatedExports';

export const styles = StyleSheet.create({

  scrollContent: {
    flex: 1,
    paddingHorizontal: 15,
  },
  activityCard: {
    backgroundColor: '#3A3A3A',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    borderWidth: 3,
    borderColor: '#5A5A3A',
  },
  sectionTitle: {
    color: '#6B9BD1',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  graphContainer: {
    height: 100,
    backgroundColor: '#2B2B3B',
    borderRadius: 10,
    marginBottom: 10,
    position: 'relative',
  },
  graphLine: {
    flex: 1,
    position: 'relative',
  },
  graphDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#6B9BD1',
    position: 'absolute',
    top: 20,
    left: '5%',
  },
  activityLabels: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  activityLabel: {
    color: '#888',
    fontSize: 10,
  },
  progressionCard: {
    flex: 1,
    width:10,
    backgroundColor: '#4A4A2A',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#2B2B2B',
  },
  bottomSection: {
    flexDirection: 'row',
    marginBottom: 30,
    alignContent:'space-evenly',
    gap: 10,
  },
  circleContainer: {
    marginBottom: 10,
  },
  outerCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 5,
    borderColor: '#E85D75',
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 5,
    borderColor: '#D4AF37',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 5,
    borderColor: '#6B9BD1',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  circleText: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  circleSubtext: {
    color: '#FFF',
    fontSize: 14,
    marginTop: 8,
  },
  progressionTitle: {
    color: '#D4AF37',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  barChartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'baseline',
    width: '100%',
    height: 80,
  },
  barWrapper: {
    alignItems: 'center',
    flex: 1,
  },
  bar: {
    width: 12,
    backgroundColor: '#D4AF37',
    borderRadius: 3,
  },
  barLabel: {
    color: '#888',
    fontSize: 10,
    marginTop: 5,
  },
  taskCard: {
    flex: 1.5,
    backgroundColor: '#4A4A2A',
    borderRadius: 15,
    overflow: 'hidden',
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#3A3A1A',
    padding: 10,
  },
  taskHeaderText: {
    color: '#D4AF37',
    fontSize: 12,
    fontWeight: 'bold',
  },
  taskHeaderIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  taskList: {
    maxHeight: 200,
    padding: 10,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  taskCheckbox: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#4CAF50',
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  taskCheckboxCompleted: {
    backgroundColor: '#4CAF50',
  },
  taskCheck: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  taskText: {
    color: '#CCC',
    fontSize: 11,
    flex: 1,
  },
  taskTextCompleted: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  taskFooter: {
    backgroundColor: '#3A3A1A',
    padding: 15,
  },
  taskFooterText: {
    color: '#D4AF37',
    fontSize: 10,
    textAlign: 'center',
    lineHeight: 14,
  },
  topActivitiesSection: {
    marginBottom: 15,
  },
  topActivitiesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#3A3A2A',
    padding: 15,
    borderRadius: 10,
  },
  topActivitiesTitle: {
    color: '#D4AF37',
    fontSize: 14,
    fontWeight: 'bold',
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#D4AF37',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#2B2B2B',
    fontSize: 24,
    fontWeight: 'bold',
  },

  // Preset

  itemContainer: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e1d6a2ff',
    alignItems: 'center',
    width:270
  },
   textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color:'rgba(202, 192, 0, 1)',
  },
  lastMessage: {
    fontSize: 14,
    padding:3,
    paddingStart:10,
    color: 'rgba(224, 219, 219, 1)',
  },
  infoContainer: {
    alignItems: 'flex-end',
  },
  timestamp: {
    fontSize: 12,
    color: 'rgba(224, 219, 219, 1)',
    justifyContent:'center'
  },
  listContiner:{
    flex:1,
    justifyContent:'center',
  }
});