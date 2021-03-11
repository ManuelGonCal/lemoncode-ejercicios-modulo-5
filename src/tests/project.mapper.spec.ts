import * as apiModel from 'pods/project/api/project.api-model';
import * as viewModel from 'pods/project/project.vm';
import { mapProjectFromApiToVm } from 'pods/project/project.mapper';

describe('project.mapper specs', () => {
  it('should return empty project when it feeds undifined', () => {
    //Arrange
    const project: apiModel.Project = undefined;
    //Act
    const result: viewModel.Project = mapProjectFromApiToVm(project);
    //Assert
    expect(result).toEqual(viewModel.createEmptyProject());
  });
  it('should return empty project when it feeds null', () => {
    //Arrange
    const project: apiModel.Project = null;
    //Act
    const result: viewModel.Project = mapProjectFromApiToVm(project);
    //Assert
    expect(result).toEqual(viewModel.createEmptyProject());
  });
});
